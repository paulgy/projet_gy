"use client";

import React, { useState, useRef } from "react";

// Type pour représenter un champ à remplir
type ClozeField = {
  id: string;
  answer: number;
  tolerance?: number;
  userInput?: string;
  isCorrect?: boolean;
};

// Type pour les props du composant
type QuestionClozeProps = {
  instructions: string;
  text: string;
  fields: ClozeField[];
  iframeUrls?: string[];
  iframeHeights?: number[];
  onComplete?: (score: number, total: number) => void;
};

const QuestionCloze: React.FC<QuestionClozeProps> = ({
  instructions,
  text,
  fields,
  iframeUrls = [],
  iframeHeights = [],
  onComplete,
}) => {
  // État pour stocker les entrées de l'utilisateur
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: boolean | null }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number>(0);

  // Référence pour les champs d'entrée
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Créer les éléments React à partir du texte avec placeholders
  const createElements = () => {
    const elements: React.ReactNode[] = [];
    let currentText = text;

    // Trier les champs par ordre décroissant d'ID pour éviter les problèmes de remplacement
    const sortedFields = [...fields].sort(
      (a, b) => parseInt(b.id) - parseInt(a.id)
    );

    // Remplacer chaque placeholder par un input
    sortedFields.forEach((field) => {
      const placeholder = `{${field.id}}`;
      const parts = currentText.split(placeholder);

      if (parts.length > 1) {
        currentText = parts.join("___INPUT_PLACEHOLDER___");
      }
    });

    // Diviser le texte en segments
    const segments = currentText.split("___INPUT_PLACEHOLDER___");

    // Créer les éléments React
    let fieldIndex = 0;
    segments.forEach((segment, index) => {
      // Ajouter le segment de texte
      if (segment) {
        elements.push(
          <span
            key={`text-${index}`}
            dangerouslySetInnerHTML={{ __html: segment }}
          />
        );
      }

      // Ajouter l'input après le segment (sauf pour le dernier segment)
      if (index < segments.length - 1) {
        const field = sortedFields[fieldIndex];
        elements.push(
          <input
            key={`input-${field.id}`}
            ref={(el) => {
              inputRefs.current[field.id] = el;
            }}
            type="text"
            className={`w-16 px-2 py-1 mx-1 text-center border ${
              showResults
                ? results[field.id]
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
                : "border-gray-300"
            } rounded focus:outline-none focus:border-blue-500`}
            value={userInputs[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            disabled={showResults}
            aria-label={`Champ ${fieldIndex + 1}`}
          />
        );
        fieldIndex++;
      }
    });

    return elements;
  };

  // Gestion des changements d'entrée
  const handleInputChange = (id: string, value: string) => {
    // Autoriser seulement les chiffres, le point et la virgule
    const sanitizedValue = value.replace(/[^0-9.,]/g, "");

    setUserInputs((prev) => ({
      ...prev,
      [id]: sanitizedValue,
    }));
  };

  // Vérification des réponses
  const checkAnswers = () => {
    const newResults: { [key: string]: boolean } = {};
    let correctCount = 0;

    fields.forEach((field) => {
      // Normaliser l'entrée utilisateur (remplacer virgules par points)
      const normalizedInput = (userInputs[field.id] || "").replace(/,/g, ".");
      const userValue = parseFloat(normalizedInput);
      const expectedValue = field.answer;
      const tolerance = field.tolerance || 0;

      console.log(
        `Champ ${field.id}: entrée="${normalizedInput}", valeur=${userValue}, attendu=${expectedValue}`
      );

      // Vérification si la réponse est correcte (avec tolérance éventuelle)
      const isCorrect =
        !isNaN(userValue) && Math.abs(userValue - expectedValue) <= tolerance;

      newResults[field.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);
    setScore(correctCount);
    setShowResults(true);

    if (onComplete) {
      onComplete(correctCount, fields.length);
    }
  };

  // Réinitialisation de l'exercice
  const resetExercise = () => {
    setUserInputs({});
    setResults({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Affichage des iframes */}
      {iframeUrls.map((url, index) => (
        <div key={index} className="mb-6">
          <iframe
            src={url}
            width="100%"
            height={iframeHeights[index] || 600}
            style={{ border: "none" }}
            title={`Données statistiques ${index + 1}`}
          />
        </div>
      ))}

      {/* Instructions */}
      <div className="mb-6">
        <p
          className="font-semibold"
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      </div>

      {/* Texte à trous */}
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg leading-relaxed">
        {createElements()}
      </div>

      {/* Boutons de vérification et de réinitialisation */}
      <div className="flex justify-end gap-4">
        {showResults && (
          <div className="mr-auto text-lg">
            Score:{" "}
            <span className="font-bold">
              {score}/{fields.length}
            </span>
          </div>
        )}
        {showResults ? (
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Réessayer
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Vérifier mes réponses
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCloze;
