"use client";

import Link from "next/link";
import ClozeQuestion from "@/components/ClozeQuestion";
import type { Segment } from "@/components/ClozeQuestion";
import EmploymentStatusChart from "@/components/EmploymentStatusChart";
import { useState } from "react";

// Type pour les données d'exercice
type ExerciseData = {
  title: string;
  description: string;
  segments: Segment[];
};

export default function Exercice1() {
  // État pour suivre la progression
  const [isCompleted, setIsCompleted] = useState(false);
  // État pour compter les tentatives
  const [attempts, setAttempts] = useState(0);

  // Les données de l'exercice
  const exerciseData: ExerciseData = {
    title: "Le travail indépendant et le salariat en France",
    description:
      "Complétez le texte suivant en analysant le graphique ci-dessus.",
    segments: [
      {
        type: "text",
        content: "Alors que les indépendants représentaient encore ",
      },
      {
        type: "blank",
        id: "indep_1982",
        answerType: "number",
        correct: 18.6,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " % de la population active occupée en 1982, ils ne représentent plus que ",
      },
      {
        type: "blank",
        id: "indep_2023",
        answerType: "number",
        correct: 12.9,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " % des personnes en emploi en 2023, soit une baisse de ",
      },
      {
        type: "blank",
        id: "baisse",
        answerType: "number",
        correct: 5.7,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " points de pourcentage. Le processus de salarisation, observé après la seconde guerre mondiale, s'est donc poursuivi depuis le début des années 1980. Cependant, depuis le milieu des années 2010, on assiste à un rebond du travail indépendant qui atteint en ",
      },
      {
        type: "blank",
        id: "annee_pic",
        answerType: "number",
        correct: 2022,
        tolerance: 0,
      },
      {
        type: "text",
        content:
          " son plus haut niveau (13,1 %) depuis 1999. Pendant cette période, l'emploi précaire (CDD et intérim) a ",
      },
      {
        type: "blank",
        id: "tendance_cdd",
        answerType: "choice",
        options: ["augmenté", "diminué", "stagné"],
        correct: "augmenté",
      },
      {
        type: "text",
        content: ", passant de 3,6% en 1982 à près de 10% en 2023.",
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
            <h1 className="text-3xl font-bold">
              Exercice 1 : {exerciseData.title}
            </h1>

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
              Cet exercice vous propose d&apos;analyser l&apos;évolution du
              travail indépendant en France depuis les années 1980 jusqu&apos;à
              aujourd&apos;hui. Observez attentivement le graphique ci-dessous
              puis complétez le texte d&apos;analyse.
            </p>
          </div>

          {/* Graphique d'évolution des indépendants et CDD/Intérim */}
          <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-bold mb-4 text-center">
              Graphique – Part des indépendants, des CDD et des intérimaires
              dans l&apos;emploi de 1982 à 2023
            </h2>
            <EmploymentStatusChart height={450} />
          </div>

          {/* Composant ClozeQuestion */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Complétez le texte :</h2>
            <ClozeQuestion
              segments={exerciseData.segments}
              onComplete={handleCompletion}
            />
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              Notes: Tolérance de ±0.1 point de pourcentage pour les valeurs
              numériques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
