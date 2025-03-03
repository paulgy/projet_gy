// src/components/ClozeQuestion.tsx
"use client";
import { useState, useEffect } from "react";

// Types pour les segments
export type TextSegment = {
  type: "text";
  content: string;
};

export type BlankSegmentBase = {
  type: "blank";
  id: string;
};

export type NumberBlankSegment = BlankSegmentBase & {
  answerType: "number";
  correct: number;
  tolerance?: number;
};

export type TextBlankSegment = BlankSegmentBase & {
  answerType: "text";
  correct: string;
};

export type ChoiceBlankSegment = BlankSegmentBase & {
  answerType: "choice";
  options: string[];
  correct: string;
};

export type BlankSegment =
  | NumberBlankSegment
  | TextBlankSegment
  | ChoiceBlankSegment;
export type Segment = TextSegment | BlankSegment;

// Type pour le feedback
type FeedbackState = {
  [key: string]: "correct" | "incorrect" | null;
};

// Type pour les réponses
type AnswersState = {
  [key: string]: string;
};

export interface ClozeQuestionProps {
  segments: Segment[];
  onComplete?: () => void;
}

/**
 * Composant pour créer des exercices de type texte à trous (cloze questions)
 * @param {ClozeQuestionProps} props
 * @param {Segment[]} props.segments - Les segments de texte et les trous
 * @param {Function} props.onComplete - Fonction appelée quand tous les champs sont complétés correctement
 */
const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
  segments = [],
  onComplete = () => {},
}) => {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialiser les réponses
  useEffect(() => {
    const initialAnswers: AnswersState = {};
    segments
      .filter((segment) => segment.type === "blank")
      .forEach((segment) => {
        initialAnswers[segment.id] = "";
      });
    setAnswers(initialAnswers);
    setFeedback({});
  }, [segments]);

  // Vérifier si tout est correct
  useEffect(() => {
    if (Object.keys(feedback).length === 0) return;

    const allCorrect = Object.values(feedback).every(
      (status) => status === "correct"
    );
    const allAnswered = segments
      .filter((segment) => segment.type === "blank")
      .every((segment) => answers[segment.id] !== "");

    if (allCorrect && allAnswered && !isCompleted) {
      setIsCompleted(true);
      onComplete();
    }
  }, [feedback, answers, segments, isCompleted, onComplete]);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setFeedback((prev) => ({ ...prev, [id]: null }));
  };

  const checkAnswer = (
    segment: BlankSegment
  ): "correct" | "incorrect" | null => {
    const answer = answers[segment.id];
    if (!answer) return null;

    switch (segment.answerType) {
      case "number":
        const numAnswer = parseFloat(answer);
        const numCorrect = segment.correct;
        const tolerance = segment.tolerance || 0;

        if (isNaN(numAnswer)) return "incorrect";

        if (Math.abs(numAnswer - numCorrect) <= tolerance) {
          return "correct";
        }
        return "incorrect";

      case "text":
        const normalizedAnswer = answer.trim().toLowerCase();
        const normalizedCorrect = segment.correct.trim().toLowerCase();

        // On peut ajouter des options comme ignorer les accents, etc.
        return normalizedAnswer === normalizedCorrect ? "correct" : "incorrect";

      case "choice":
        return answer === segment.correct ? "correct" : "incorrect";

      default:
        return null;
    }
  };

  const validateAllAnswers = () => {
    const newFeedback: FeedbackState = {};

    segments
      .filter((segment): segment is BlankSegment => segment.type === "blank")
      .forEach((segment) => {
        newFeedback[segment.id] = checkAnswer(segment);
      });

    setFeedback(newFeedback);
  };

  const renderSegment = (segment: Segment, index: number) => {
    if (segment.type === "text") {
      return <span key={index}>{segment.content}</span>;
    }

    if (segment.type === "blank") {
      const status = feedback[segment.id];
      const statusClass = status
        ? status === "correct"
          ? "bg-green-100 border-green-500"
          : "bg-red-100 border-red-500"
        : "";

      switch (segment.answerType) {
        case "number":
          return (
            <input
              key={index}
              type="number"
              step="any"
              value={answers[segment.id] || ""}
              onChange={(e) => handleChange(segment.id, e.target.value)}
              className={`mx-1 inline-block border-b-2 border-blue-500 focus:outline-none px-1 w-20 text-center ${statusClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              placeholder="#"
            />
          );

        case "text":
          return (
            <input
              key={index}
              type="text"
              value={answers[segment.id] || ""}
              onChange={(e) => handleChange(segment.id, e.target.value)}
              className={`mx-1 inline-block border-b-2 border-blue-500 focus:outline-none px-1 min-w-24 w-auto text-center ${statusClass}`}
              placeholder="..."
            />
          );

        case "choice":
          return (
            <select
              key={index}
              value={answers[segment.id] || ""}
              onChange={(e) => handleChange(segment.id, e.target.value)}
              className={`mx-1 inline-block border-b-2 border-blue-500 focus:outline-none px-1 ${statusClass}`}
            >
              <option value="">Choisir...</option>
              {segment.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );

        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="mb-4 leading-relaxed">{segments.map(renderSegment)}</div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={validateAllAnswers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Vérifier
        </button>

        {isCompleted && (
          <div className="text-green-600 font-semibold">
            Bravo ! Toutes les réponses sont correctes.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClozeQuestion;
