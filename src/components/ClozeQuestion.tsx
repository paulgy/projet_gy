import React, { useState, useEffect } from "react";

// Types pour les segments de texte
export type Segment =
  | { type: "text"; content: string }
  | {
      type: "blank";
      id: string;
      answerType: "number" | "text" | "choice";
      correct: number | string;
      tolerance?: number;
      options?: string[];
    };

// Types pour les réponses
type Answers = {
  [key: string]: string;
};

// Types pour l'état de validation des réponses
type ValidationState = {
  [key: string]: "correct" | "incorrect" | "unattempted";
};

interface ClozeQuestionProps {
  segments: Segment[];
  onComplete: () => void;
}

const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
  segments,
  onComplete,
}) => {
  // État pour stocker les réponses de l'utilisateur
  const [answers, setAnswers] = useState<Answers>({});

  // État pour stocker la validation de chaque réponse
  const [validationState, setValidationState] = useState<ValidationState>({});

  // État pour savoir si l'exercice a été vérifié
  const [isChecked, setIsChecked] = useState(false);

  // État pour compter le nombre de tentatives
  const [attempts, setAttempts] = useState(0);

  // État pour suivre si toutes les réponses sont correctes
  const [allCorrect, setAllCorrect] = useState(false);

  // Initialiser l'état des validations
  useEffect(() => {
    const initialValidationState: ValidationState = {};
    segments.forEach((segment) => {
      if (segment.type === "blank") {
        initialValidationState[segment.id] = "unattempted";
      }
    });
    setValidationState(initialValidationState);
  }, [segments]);

  // Gérer le changement de réponse
  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Si déjà vérifié, mettre à jour la validation en temps réel
    if (isChecked) {
      validateAnswer(id, value);
    }
  };

  // Valider une réponse spécifique
  const validateAnswer = (id: string, value: string) => {
    const segment = segments.find(
      (s) => s.type === "blank" && s.id === id
    ) as Exclude<Segment, { type: "text" }>;

    if (!segment) return;

    if (segment.answerType === "number") {
      // Remplacer la virgule par un point pour supporter les deux notations
      const normalizedValue = value.replace(",", ".");
      const numValue = parseFloat(normalizedValue);
      const correctValue = segment.correct as number;
      const tolerance = segment.tolerance || 0;

      const isCorrect =
        !isNaN(numValue) && Math.abs(numValue - correctValue) <= tolerance;

      setValidationState((prev) => ({
        ...prev,
        [id]: isCorrect ? "correct" : "incorrect",
      }));

      return isCorrect;
    } else if (segment.answerType === "choice") {
      const isCorrect = value === segment.correct;

      setValidationState((prev) => ({
        ...prev,
        [id]: isCorrect ? "correct" : "incorrect",
      }));

      return isCorrect;
    } else {
      // Pour les réponses textuelles
      const isCorrect =
        value.trim().toLowerCase() ===
        (segment.correct as string).toLowerCase();

      setValidationState((prev) => ({
        ...prev,
        [id]: isCorrect ? "correct" : "incorrect",
      }));

      return isCorrect;
    }
  };

  // Vérifier toutes les réponses
  const checkAnswers = () => {
    setIsChecked(true);
    setAttempts((prev) => prev + 1);

    let correctCount = 0;
    let totalBlanks = 0;

    // Valider chaque réponse
    segments.forEach((segment) => {
      if (segment.type === "blank") {
        totalBlanks++;
        const value = answers[segment.id] || "";

        // Mettre à jour l'état 'unattempted' pour les champs vides
        if (!value.trim()) {
          setValidationState((prev) => ({
            ...prev,
            [segment.id]: "unattempted",
          }));
          return;
        }

        const isCorrect = validateAnswer(segment.id, value);
        if (isCorrect) {
          correctCount++;
        }
      }
    });

    // Vérifier si toutes les réponses sont correctes
    const newAllCorrect = correctCount === totalBlanks;
    setAllCorrect(newAllCorrect);

    // Si toutes les réponses sont correctes, appeler onComplete
    if (newAllCorrect) {
      onComplete();
    }
  };

  // Réinitialiser l'exercice pour une nouvelle tentative (conserve les réponses)
  const resetExercise = () => {
    // Réinitialiser uniquement la validation visuelle
    setIsChecked(false);
  };

  // Rendu des segments
  const renderSegment = (segment: Segment, index: number) => {
    if (segment.type === "text") {
      return <span key={index}>{segment.content}</span>;
    }

    const id = segment.id;
    const value = answers[id] || "";
    const validation = validationState[id];

    // Déterminer la classe CSS en fonction de l'état de validation
    let inputClasses =
      "border rounded px-2 py-1 mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (isChecked) {
      if (validation === "correct") {
        inputClasses += " bg-green-100 text-green-800 border-green-500";
      } else if (validation === "incorrect") {
        inputClasses += " bg-red-100 text-red-800 border-red-500";
      } else {
        inputClasses += " bg-yellow-100 text-yellow-800 border-yellow-500"; // Non tenté
      }
    }

    // Adapter la largeur en fonction du type de champ
    if (segment.answerType === "number") {
      inputClasses += " w-20";
    } else if (segment.answerType === "choice") {
      inputClasses += " w-32";
    } else {
      inputClasses += " w-28";
    }

    if (segment.answerType === "choice" && segment.options) {
      return (
        <select
          key={index}
          value={value}
          onChange={(e) => handleAnswerChange(id, e.target.value)}
          className={inputClasses}
        >
          <option value="">Sélectionner</option>
          {segment.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    // Déterminer le placeholder en fonction du type et de l'ID du champ
    let placeholder = "...";
    if (segment.answerType === "number") {
      // Identifier les champs d'année par leur ID
      if (id.includes("annee") || id.includes("an_") || id === "annee_pic") {
        placeholder = "année";
      } else {
        placeholder = "0,0";
      }
    }

    return (
      <input
        key={index}
        type="text"
        value={value}
        onChange={(e) => handleAnswerChange(id, e.target.value)}
        className={inputClasses}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="mb-4 text-lg leading-relaxed">
        {segments.map(renderSegment)}
      </div>

      <div className="flex justify-between mt-6">
        <div>
          {attempts > 0 && (
            <span className="text-sm text-gray-600">Tentative {attempts}</span>
          )}
        </div>

        <div>
          <button
            onClick={isChecked ? resetExercise : checkAnswers}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            {isChecked ? "Nouvelle tentative" : "Vérifier les réponses"}
          </button>
        </div>
      </div>

      {isChecked && (
        <div className="mt-4">
          {allCorrect ? (
            <div className="bg-green-100 text-green-800 p-3 rounded-md">
              Félicitations ! Toutes vos réponses sont correctes.
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md">
              Certaines réponses sont incorrectes. Vous pouvez les corriger et
              revérifier.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClozeQuestion;
