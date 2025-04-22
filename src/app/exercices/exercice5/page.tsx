"use client";

import React, { useState } from "react";
import Link from "next/link";

// Interface GrowthData (inchangée)
interface GrowthData {
  year: string;
  value: number;
}

const rawCsvData = `
"Libellé";"Taux de croissance annuelle du PIB réel par habitant";"Codes"
"idBank";"010596080";""
"Dernière mise à jour";"17/02/2025 15:00";""
"Période";"";""
"2024";"";"O"
"2023";"0.6";"A"
"2022";"2.3";"P"
"2021";"6.5";"A"
"2020";"-7.8";"A"
"2019";"1.6";"A"
"2018";"1.2";"A"
"2017";"1.7";"A"
"2016";"0.5";"A"
"2015";"0.6";"A"
"2014";"0.5";"A"
"2013";"0.3";"A"
"2012";"-0.3";"A"
"2011";"2.0";"A"
"2010";"1.5";"A"
`;

// Fonction parseGrowthData (inchangée)
const parseGrowthData = (csv: string): GrowthData[] => {
  const lines = csv.trim().split("\n");
  const dataLines = lines.slice(4);
  const data: GrowthData[] = dataLines
    .map((line) => {
      const parts = line
        .match(/(?:\"([^\"]*)\"|([^;]+))/g)
        ?.map((part) => part.replace(/^\"|\"$/g, ""));
      if (parts && parts.length >= 2) {
        const year = parts[0];
        const valueStr = parts[1];
        if (!isNaN(parseInt(year))) {
          const value =
            valueStr === "" || isNaN(parseFloat(valueStr))
              ? null
              : parseFloat(valueStr);
          if (value !== null) {
            return { year, value };
          }
        }
      }
      return null;
    })
    .filter((item): item is GrowthData => item !== null);
  return data;
};

// Interface EvaluationResponse (inchangée)
interface EvaluationResponse {
  is_correct?: boolean | null;
  feedback_message: string;
  missing_elements?: string[] | null;
  accuracy_issues?: string[] | null;
  language_issues?: string[] | null;
}

// Le composant de la page d'exercice
const ExerciceLectureDonneesPage = () => {
  const growthData = parseGrowthData(rawCsvData);
  const highlightedYear = "2020";

  // États (inchangés)
  const [studentAnswer, setStudentAnswer] = useState("");
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction handleSubmit (inchangée)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const response = await fetch("/api/evaluate-sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: studentAnswer }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || `Erreur ${response.status} lors de l'appel API.`
        );
      }
      setFeedback(data as EvaluationResponse);
    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
      setError(
        err instanceof Error ? err.message : "Une erreur inconnue est survenue."
      );
      setFeedback(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* En-tête (inchangé) */}
        <div className="mb-8">
          {/* ... (code de l'en-tête inchangé) ... */}
          <div className="flex items-center mb-4">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-900 mr-3 font-medium"
            >
              &larr; Retour à l'accueil
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Lecture de données corrigée par Mistral AI
          </h1>
          <p className="text-gray-700">
            Analysez le tableau statistique ci-dessous et répondez à la question
            posée.
          </p>
        </div>

        {/* --- Section Tableau (Centré) --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Taux de croissance annuel du PIB réel par habitant en France (%)
          </h2>
          {/* Conteneur : Ajout de flex et justify-center pour centrer le tableau */}
          <div className="overflow-x-auto flex justify-center">
            {" "}
            {/* <-- Ajout des classes ici */}
            {/* Table : Largeur ajustée au contenu (pas de min-w-full) */}
            <table className="divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {/* Header 1 : Largeur AUTO, Alignement GAUCHE */}
                  <th
                    scope="col"
                    className="px-4 py-2 w-auto text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Année
                  </th>
                  {/* Header 2 : Largeur AUTO, Alignement CENTRE */}
                  <th
                    scope="col"
                    className="px-4 py-2 w-auto text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Taux de croissance (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {growthData.map((data) => (
                  <tr
                    key={data.year}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                  >
                    {/* Cell 1 : Alignement GAUCHE */}
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.year}
                    </td>
                    {/* Cell 2 : Alignement CENTRE */}
                    <td
                      className={`px-4 py-2 whitespace-nowrap text-center text-sm text-gray-700 ${
                        data.year === highlightedYear
                          ? "bg-yellow-100 font-bold ring-1 ring-inset ring-red-500"
                          : ""
                      }`}
                    >
                      {data.value.toLocaleString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Source (inchangée) */}
          <div className="mt-4 text-xs text-gray-500 text-left">
            <p>Champ : France.</p>
            <p>
              Source :{" "}
              <a
                href="https://www.insee.fr/fr/statistiques/serie/010596080#Tableau"
                target="_blank"
              >
                Insee
              </a>
              , Comptes nationaux annuels - base 2020 (données du{" "}
              {rawCsvData.split("\n")[2].split(";")[1].replace(/"/g, "")}{" "}
              extraites pour cet exercice).
            </p>
          </div>
        </div>

        {/* Section Question et Réponse (inchangée) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* ... (code de la question, réponse, bouton, feedback inchangé) ... */}
          <div
            className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded"
            role="alert"
          >
            <p className="font-bold mb-2">Question :</p>
            <p>
              Rédiger une phrase présentant la signification précise de la
              donnée{" "}
              <strong className="text-red-600 font-semibold">encadrée</strong>{" "}
              dans le tableau ci-dessus.
            </p>
          </div>

          {/* Zone de saisie (inchangée) */}
          <div>
            <label
              htmlFor="studentAnswer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Votre phrase :
            </label>
            <textarea
              id="studentAnswer"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Écrivez ici votre phrase..."
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>

          {/* Bouton de soumission (inchangé) */}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || studentAnswer.length < 5}
          >
            {isLoading ? "Vérification en cours..." : "Vérifier ma réponse"}
          </button>

          {/* Zone d'erreur (inchangée) */}
          {error && (
            <div
              className="mt-4 p-4 bg-red-100 text-red-700 rounded-md border border-red-300"
              role="alert"
            >
              <p className="font-bold">Erreur</p>
              <p>{error}</p>
            </div>
          )}

          {/* Zone de feedback (inchangée) */}
          {feedback && !error && (
            <div
              className={`mt-4 p-4 rounded-md border ${
                feedback.is_correct
                  ? "bg-green-50 border-green-300 text-green-800"
                  : "bg-orange-50 border-orange-300 text-orange-800"
              }`}
            >
              <p className="font-semibold">Correction :</p>
              <p>{feedback.feedback_message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciceLectureDonneesPage;
