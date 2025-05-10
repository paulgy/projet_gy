// src/components/MistralEc2Exercise.tsx
"use client";

import React, { useState } from "react";

// Interface pour les données du tableau
interface economicData {
  id: number;
  pays: string;
  inflation: string; // Garder en string pour gérer les vides ou "n/a"
  chomage: string; // Garder en string
}

// Données du tableau pour l'exercice

// Correction des données basée sur votre question et la correction attendue:
// Question: "Comparez les conjonctures économiques de l’Espagne et de la Lettonie."
// Correction mentionne: Espagne (inflation 2,9%, chomage 12,7%), Lettonie (inflation 12,3%, chomage 5,7%)
const EconomicData: economicData[] = [
  { id: 1, pays: "Zone euro", inflation: "6,1", chomage: "6,5" },
  { id: 2, pays: "Pays Bas", inflation: "6,8", chomage: "3,5" }, // CSV: ;;6,8;3,5. Si 6,8 est chomage et 3,5 inflation
  { id: 3, pays: "France", inflation: "6,0", chomage: "7,0" },
  { id: 4, pays: "Allemagne", inflation: "6,3", chomage: "2,9" },
  { id: 5, pays: "Espagne", inflation: "2,9", chomage: "12,7" }, // Corrigé pour correspondre à la correction
  { id: 6, pays: "Italie", inflation: "8,0", chomage: "7,6" },
  { id: 7, pays: "Lettonie", inflation: "12,3", chomage: "5,7" }, // Corrigé pour correspondre à la correction
  { id: 8, pays: "Grèce", inflation: "4,1", chomage: "10,8" },
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

const MistralEc2Exercise = () => {
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    console.log(
      "Soumission de la réponse pour évaluation EC2 (Mistral):",
      studentAnswer
    );

    try {
      // Note: Nous allons créer cette route API à la prochaine étape
      const response = await fetch("/api/evaluate-ec2-mistral", {
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
    <div className="p-6 bg-white rounded-lg shadow-md mb-8 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Indicateurs économiques en Zone Euro - Mai 2023
      </h2>
      <div className="overflow-x-auto flex justify-center mb-4">
        <table className="divide-y divide-gray-300 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-300"
              >
                Pays
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-300"
              >
                Taux d’inflation annuel en mai 2023 en %
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Taux de chômage en mai 2023 en %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {EconomicData.map(
              (
                data // Utilisation de EconomicData
              ) => (
                <tr
                  key={data.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                    {data.pays}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-300">
                    {data.inflation || "N/A"} {/* Affiche N/A si vide */}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700">
                    {data.chomage || "N/A"} {/* Affiche N/A si vide */}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p>
          <strong>Source :</strong> D’après Eurostat, 2023.
        </p>
      </div>

      {/* --- Section Question et Réponse --- */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div
          className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded"
          role="alert"
        >
          <p className="font-bold mb-2">Question :</p>
          <p>
            À l’aide du document, comparez les conjonctures économiques de
            l’Espagne et de la Lettonie. (2 points)
          </p>
        </div>

        <div>
          <label
            htmlFor="studentAnswerEc2Mistral" // ID unique pour le textarea
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Votre réponse :
          </label>
          <textarea
            id="studentAnswerEc2Mistral"
            rows={6} // Un peu plus d'espace pour une comparaison détaillée
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Rédigez votre comparaison ici..."
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            disabled={isLoading}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || studentAnswer.trim().length < 10} // Condition de désactivation
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

        {/* Zone de feedback (inchangée dans sa structure) */}
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

            {/* Affichage conditionnel des listes (inchangé) */}
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
      </div>
    </div>
  );
};

export default MistralEc2Exercise;
