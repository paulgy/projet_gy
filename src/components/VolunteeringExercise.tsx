// src/components/VolunteeringExercise.tsx
"use client";

import React, { useState } from "react";

// Interface pour les données du tableau (inchangée)
interface VolunteeringData {
  id: number;
  level: string;
  footnote?: string;
  y2019: number;
  y2022: number;
  y2023: number;
}

// Données du tableau (inchangées)
const volunteeringData: VolunteeringData[] = [
  { id: 1, level: "Diplôme supérieur", y2019: 31, y2022: 27, y2023: 29 },
  { id: 2, level: "Bac + 2", y2019: 29, y2022: 24, y2023: 24 },
  { id: 3, level: "Niveau Bac", y2019: 21, y2022: 17, y2023: 22 },
  { id: 4, level: "CAP, BEP", footnote: "1", y2019: 18, y2022: 15, y2023: 17 },
  {
    id: 5,
    level: "Pas de diplôme, CEP, BEPC",
    footnote: "2",
    y2019: 15,
    y2022: 15,
    y2023: 16,
  },
  { id: 6, level: "Ensemble", y2019: 24, y2022: 20, y2023: 23 },
];

// Interface pour la réponse de l'évaluation (inchangée)
interface EvaluationResponse {
  score: number;
  feedback_message: string;
  positive_points?: string[] | null;
  missing_elements?: string[] | null;
  accuracy_issues?: string[] | null;
  language_issues?: string[] | null;
}

const VolunteeringExercise = () => {
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction handleSubmit (inchangée par rapport à la dernière version correcte)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    console.log("Soumission de la réponse pour évaluation :", studentAnswer);

    try {
      const response = await fetch("/api/evaluate-volunteering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: studentAnswer }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorDetails =
          data?.details || data?.error || `Erreur ${response.status}`;
        console.error("Erreur API reçue:", errorDetails);
        throw new Error(errorDetails);
      }
      if (
        typeof data?.score !== "number" ||
        typeof data?.feedback_message !== "string"
      ) {
        console.error("Format de réponse API inattendu:", data);
        throw new Error("Format de réponse de l'API invalide.");
      }
      setFeedback(data as EvaluationResponse);
    } catch (err) {
      console.error(
        "Erreur lors de la soumission ou du traitement de la réponse:",
        err
      );
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inconnue est survenue lors de l'évaluation."
      );
      setFeedback(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8 w-full max-w-3xl mx-auto">
      {/* Tableau (inchangé) */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Proportion de bénévoles en associations selon le niveau de diplôme
        (données en %)
      </h2>
      <div className="overflow-x-auto flex justify-center mb-4">
        <table className="divide-y divide-gray-300 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-300"
              >
                Niveau de diplôme
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-300"
              >
                2019
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-300"
              >
                2022
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                2023
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {volunteeringData.map((data) => (
              <tr
                key={data.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                  {data.level}
                  {data.footnote && <sup>{data.footnote}</sup>}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-300">
                  {data.y2019}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-300">
                  {data.y2022}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700">
                  {data.y2023}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes (inchangées) */}
      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p>
          <strong>Lecture :</strong> en 2023 la proportion de bénévoles parmi
          les diplômés du supérieur est de 29 %.
        </p>
        <p>
          <strong>Notes :</strong>
          <br />
          1. CAP : Certificat d’Aptitude Professionnelle, BEP : Brevet d’Études
          Professionnelles.
          <br />
          2. CEP : Certificat d’Etudes Primaires ; BEPC : Brevet d’Études du
          Premier Cycle, examen que l’on passait en fin de classe de troisième,
          ancêtre du DNB.
        </p>
        <p>
          <strong>Source :</strong> D’après Recherches et Solidarités, « Les
          Français et le bénévolat », 02/03/2023.
        </p>
      </div>

      {/* --- Section Question et Réponse --- */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {/* Question (inchangée) */}
        <div
          className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded"
          role="alert"
        >
          <p className="font-bold mb-2">Question :</p>
          <p>
            Comparez l’engagement bénévole selon le niveau de diplôme en 2023.
          </p>
        </div>

        {/* Zone de saisie (inchangée) */}
        <div>
          <label
            htmlFor="studentAnswerVolunteering"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Votre réponse :
          </label>
          <textarea
            id="studentAnswerVolunteering"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Rédigez votre comparaison ici..."
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            disabled={isLoading}
          ></textarea>
        </div>

        {/* Bouton de soumission (inchangé) */}
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || studentAnswer.trim().length < 10}
        >
          {isLoading ? "Évaluation en cours..." : "Soumettre et évaluer"}
        </button>

        {/* Zone d'erreur (inchangée) */}
        {error && (
          <div
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-md border border-red-300"
            role="alert"
          >
            <p className="font-bold">Erreur lors de l&apos;évaluation</p>
            <p>{error}</p>
          </div>
        )}

        {/* --- Correction: Zone de feedback détaillée avec mapping direct --- */}
        {feedback && !error && (
          <div
            className={`mt-6 p-4 rounded-lg shadow-md border-l-4 ${
              feedback.score === 2
                ? "bg-green-50 border-green-500"
                : feedback.score === 1
                ? "bg-yellow-50 border-yellow-500"
                : "bg-red-50 border-red-500"
            }`}
          >
            <p
              className={`font-bold text-lg mb-2 ${
                feedback.score === 2
                  ? "text-green-800"
                  : feedback.score === 1
                  ? "text-yellow-800"
                  : "text-red-800"
              }`}
            >
              Résultat : Score {feedback.score}/2
            </p>
            <p className="text-gray-800 mb-4">{feedback.feedback_message}</p>

            {/* Affichage conditionnel des listes en utilisant .map directement */}
            {feedback.positive_points &&
              feedback.positive_points.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-green-700">
                    Points positifs :
                  </p>
                  <ul className="list-disc list-inside pl-4 text-sm text-green-700">
                    {feedback.positive_points.map((item, index) => (
                      <li key={`pos-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            {feedback.missing_elements &&
              feedback.missing_elements.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-orange-700">
                    Éléments manquants :
                  </p>
                  <ul className="list-disc list-inside pl-4 text-sm text-orange-700">
                    {feedback.missing_elements.map((item, index) => (
                      <li key={`mis-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            {feedback.accuracy_issues &&
              feedback.accuracy_issues.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-red-700">
                    Points d&apos;exactitude à revoir :
                  </p>
                  <ul className="list-disc list-inside pl-4 text-sm text-red-700">
                    {feedback.accuracy_issues.map((item, index) => (
                      <li key={`acc-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            {feedback.language_issues &&
              feedback.language_issues.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-blue-700">
                    Points de langue/clarté :
                  </p>
                  <ul className="list-disc list-inside pl-4 text-sm text-blue-700">
                    {feedback.language_issues.map((item, index) => (
                      <li key={`lang-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
        {/* --- Fin de la zone de feedback corrigée --- */}
      </div>
    </div>
  );
};

export default VolunteeringExercise;
