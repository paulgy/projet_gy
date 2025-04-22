"use client";

import React, { useState } from "react";
import Link from "next/link";
import SalaryEvolutionChart from "@/components/SalaryEvolutionChart";
import ClozeQuestion from "@/components/ClozeQuestion";
import type { Segment } from "@/components/ClozeQuestion";

// Type pour les données d'exercice
type ExerciseData = {
  title: string;
  description: string;
  segments: Segment[];
};

export default function Exercice3() {
  // État pour suivre la progression
  const [isCompleted, setIsCompleted] = useState(false);
  // État pour compter les tentatives
  const [attempts, setAttempts] = useState(0);

  // Les données de l'exercice
  const exerciseData: ExerciseData = {
    title: "Évolution des salaires par catégorie socioprofessionnelle",
    description:
      "Complétez le texte suivant en analysant le graphique ci-dessus.",
    segments: [
      {
        type: "text",
        content:
          "Entre 1996 et 2023, le salaire net moyen en équivalent temps plein des salariés du secteur privé a ",
      },
      {
        type: "blank",
        id: "evolution_generale",
        answerType: "choice",
        correct: "augmenté",
        options: ["baissé", "augmenté"],
      },
      {
        type: "text",
        content: " de ",
      },
      {
        type: "blank",
        id: "pourcentage_global",
        answerType: "number",
        correct: 13,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " %, en euros constants (c'est-à-dire corrigé de l'inflation). Le salaire des ouvriers a progressé de ",
      },
      {
        type: "blank",
        id: "pourcentage_ouvriers",
        answerType: "number",
        correct: 15.9,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " % sur cette période, soit ",
      },
      {
        type: "blank",
        id: "comparaison_vitesse",
        answerType: "choice",
        correct: "plus",
        options: ["moins", "plus"],
      },
      {
        type: "text",
        content:
          " rapidement que celui des autres catégories socioprofessionnelles (+",
      },
      {
        type: "blank",
        id: "pourcentage_employes",
        answerType: "number",
        correct: 10.6,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " % pour les employés, +",
      },
      {
        type: "blank",
        id: "pourcentage_cadres",
        answerType: "number",
        correct: 0.5,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " % pour les cadres et +",
      },
      {
        type: "blank",
        id: "pourcentage_pi",
        answerType: "number",
        correct: 1.0,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " % pour les professions intermédiaires). Sur une période plus récente, entre la crise économique de 2008-2009 et 2023, l'indice salaire net en équivalent temps plein dans le privé est passé de ",
      },
      {
        type: "blank",
        id: "indice_2008",
        answerType: "number",
        correct: 107.9,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " à ",
      },
      {
        type: "blank",
        id: "indice_2023",
        answerType: "number",
        correct: 113,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: ", soit une augmentation de ",
      },
      {
        type: "blank",
        id: "pourcentage_2008_2023",
        answerType: "number",
        correct: 4.73,
        tolerance: 0.04, // Accepte 4.7 comme réponse valide
      },
      {
        type: "text",
        content: " %.",
      },
    ],
  };

  // Fonction appelée lorsque l'exercice est complété
  const handleCompletion = () => {
    setIsCompleted(true);
    setAttempts((prev) => prev + 1); // Incrémenter le compteur de tentatives
    console.log("Exercice complété avec succès !");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 flex items-center hover:underline"
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
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{exerciseData.title}</h1>

            <div className="flex items-center space-x-4">
              {attempts > 0 && (
                <div className="text-sm text-gray-600">
                  Tentatives : {attempts}
                </div>
              )}

              {isCompleted && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                  Exercice complété !
                </div>
              )}
            </div>
          </div>

          {/* Description de l'exercice */}
          <div className="mb-6">
            <p className="text-gray-700">
              Cet exercice vous propose d&apos;analyser l&apos;évolution des
              salaires nets moyens en équivalent temps plein dans le secteur
              privé par catégorie socioprofessionnelle de 1996 à 2023. Observez
              attentivement le graphique ci-dessous puis complétez le texte
              d&apos;analyse.
            </p>
          </div>

          {/* Graphique d'évolution des salaires */}
          <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-bold mb-4 text-center">
              Évolution du salaire net moyen en équivalent temps plein dans le
              secteur privé
            </h2>
            <SalaryEvolutionChart height={450} />
          </div>

          {/* Composant ClozeQuestion */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              À partir des données du graphique, complétez le texte suivant :
            </h2>
            <ClozeQuestion
              segments={exerciseData.segments}
              onComplete={handleCompletion}
            />
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              Note : Vous pouvez survoler le graphique avec votre souris
              afficher les valeurs exactes. Pour les calculs, vous pouvez
              arrondir votre résultat à un chiffre après la virgule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
