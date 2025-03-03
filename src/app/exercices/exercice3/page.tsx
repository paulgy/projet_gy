/* eslint-disable react/no-unescaped-entities */
// src/app/exercices/exercice3/page.tsx
"use client";
import Link from "next/link";
import ClozeQuestion from "@/components/ClozeQuestion";
import type { Segment } from "@/components/ClozeQuestion";

// Types pour les données d'exercice
type ExerciseData = {
  title: string;
  description: string;
  segments: Segment[];
};

export default function ClozeExamplePage() {
  // Exemple d'exercice basé sur l'analyse de données statistiques
  const exerciseData: ExerciseData = {
    title: "Analyse des données démographiques en France",
    description:
      "Complétez le texte suivant en analysant le tableau de données démographiques.",
    // Ceci pourrait venir d'une API ou d'un fichier JSON
    segments: [
      {
        type: "text",
        content:
          "Selon les données de l'INSEE, la population française en 2023 était de ",
      },
      {
        type: "blank",
        id: "pop_total",
        answerType: "number",
        correct: 67.8,
        tolerance: 0.2,
      },
      {
        type: "text",
        content: " millions d'habitants. La région la plus peuplée est ",
      },
      {
        type: "blank",
        id: "region",
        answerType: "text",
        correct: "Île-de-France",
      },
      { type: "text", content: " avec " },
      {
        type: "blank",
        id: "pop_idf",
        answerType: "number",
        correct: 12.2,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " millions d'habitants. Le taux de natalité a ",
      },
      {
        type: "blank",
        id: "tendance",
        answerType: "choice",
        options: ["augmenté", "diminué", "stagné"],
        correct: "diminué",
      },
      { type: "text", content: " depuis 2010, avec un taux actuel de " },
      {
        type: "blank",
        id: "tx_natalite",
        answerType: "number",
        correct: 1.83,
        tolerance: 0.03,
      },
      { type: "text", content: " enfants par femme." },
    ],
  };

  const handleCompletion = () => {
    // Actions à effectuer une fois que l'exercice est complété correctement
    // Par exemple, débloquer l'exercice suivant ou enregistrer le progrès
    console.log("Exercice complété avec succès !");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        {/* Lien de retour vers la page d'accueil */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 flex items-center hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4">{exerciseData.title}</h1>
          <p className="mb-6">{exerciseData.description}</p>

          {/* Tableau avec les données à analyser */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-6">
            <h2 className="font-semibold mb-2">
              Données démographiques de la France (2023)
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Indicateur
                  </th>
                  <th className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Valeur
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Population totale
                  </td>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    67,8 millions
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Population Île-de-France
                  </td>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    12,2 millions
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Taux de fécondité
                  </td>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    1,83 enfant par femme
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    Évolution du taux de natalité (2010-2023)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-500 px-4 py-2">
                    -0,35 point
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Complétez le texte :</h2>
            <ClozeQuestion
              segments={exerciseData.segments}
              onComplete={handleCompletion}
            />
          </div>

          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Notes: Tolérance de ±0.2 million pour la population totale, ±0.1
              million pour la population régionale, et ±0.03 pour le taux de
              fécondité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
