"use client"; // Nécessaire pour utiliser useState

import React, { useState } from "react"; // Import useState
import Link from "next/link"; // Import Link pour la navigation

// Interface pour typer nos données de croissance (inchangée)
interface GrowthData {
  year: string;
  value: number | null;
  code: string;
}

// Données CSV brutes (inchangées)
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

// Fonction de parsing CSV (inchangée)
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
        const code = parts[2] || "";
        if (!isNaN(parseInt(year))) {
          const value =
            valueStr === "" || isNaN(parseFloat(valueStr))
              ? null
              : parseFloat(valueStr);
          return { year, value, code };
        }
      }
      return null;
    })
    .filter((item): item is GrowthData => item !== null);
  return data;
};

// Le composant de la page d'exercice
const ExerciceLectureDonneesPage = () => {
  // Traitement des données
  const growthData = parseGrowthData(rawCsvData);
  const highlightedYear = "2020";

  // État pour stocker la réponse de l'élève
  const [studentAnswer, setStudentAnswer] = useState("");
  // État pour le feedback (étape future)
  const [feedback, setFeedback] = useState("");

  // Trouver la donnée spécifique (utile pour la future correction)
  const highlightedDataPoint = growthData.find(
    (d) => d.year === highlightedYear
  );
  const expectedSentenceStart = `En ${highlightedYear}, le taux de croissance annuel du PIB réel par habitant en France`; // Exemple pour la correction future

  // Fonction pour gérer la soumission (étape future)
  const handleSubmit = () => {
    console.log("Réponse soumise :", studentAnswer);
    // Logique de correction à implémenter ici
    // Appel à l'API IA, comparaison, etc.
    // setFeedback(...)
  };

  return (
    // Structure globale inspirée de exercice2
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {" "}
        {/* Ajusté max-w pour un tableau moins large */}
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {/* Lien de retour - Adaptez le href si nécessaire */}
            <Link
              href="/exercices"
              className="text-blue-700 hover:text-blue-900 mr-3 font-medium"
            >
              &larr; Retour aux exercices
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Exercice 5 - Lecture et interprétation de données
          </h1>
          <p className="text-gray-700">
            Analysez le tableau statistique ci-dessous et répondez à la question
            posée.
          </p>
          {/* Pourrait afficher des indicateurs comme dans exercice2 si besoin */}
          {/* <div className="flex justify-end items-center mt-4 space-x-4"> ... </div> */}
        </div>
        {/* Section Tableau */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Taux de croissance annuel du PIB réel par habitant en France (%)
          </h2>
          <div className="overflow-x-auto">
            {/* Application de styles Tailwind similaires à ceux qu'on pourrait attendre pour un tableau propre */}
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Année
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Taux de croissance (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {growthData.map((data) => (
                  <tr key={data.year} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.year}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${
                        data.year === highlightedYear
                          ? "bg-yellow-100 font-bold ring-1 ring-inset ring-red-500" // Style de surlignage ajusté
                          : ""
                      }`}
                    >
                      {data.value !== null ? (
                        data.value.toLocaleString("fr-FR")
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-left">
            <p>Champ : France.</p>
            <p>
              Source : Insee, Comptes nationaux annuels - base 2020 (données du{" "}
              {rawCsvData.split("\n")[2].split(";")[1].replace(/"/g, "")}{" "}
              extraites pour cet exercice).
            </p>
            {/* Ajout dynamique de la date de màj depuis le CSV */}
          </div>
        </div>
        {/* Section Question et Réponse */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div
            className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded"
            role="alert"
          >
            <p className="font-bold mb-2">Question :</p>
            <p>
              Rédiger une phrase présentant la signification précise de la
              donnée{" "}
              <strong className="text-red-600 font-semibold">
                mise en évidence
              </strong>{" "}
              dans le tableau ci-dessus.
            </p>
            <p className="text-sm mt-1 italic">
              Indice : Pensez à mentionner l&lsquo;indicateur, l&rsquo;année, la
              zone géographique (implicite ici : France) et la valeur.
            </p>
          </div>

          <div>
            <label
              htmlFor="studentAnswer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Votre phrase :
            </label>
            <textarea
              id="studentAnswer"
              rows={3} // Réduit un peu la taille
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" // Assure une bordure visible
              placeholder="Écrivez ici votre phrase..."
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
            ></textarea>
          </div>

          {/* Bouton de soumission - Pour l'instant, il ne fait qu'afficher en console */}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Vérifier ma réponse (Bientôt disponible)
          </button>

          {/* Zone de feedback (pour plus tard) */}
          {feedback && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              <p className="font-semibold">Correction :</p>
              <p>{feedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciceLectureDonneesPage;
