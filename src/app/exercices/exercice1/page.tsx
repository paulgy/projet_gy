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
        content: " son plus haut niveau (13,1 %) depuis 1999.",
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

        {/* Section pour les professeurs */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Pour les professeurs
          </h2>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
          <p className="text-gray-700 mb-3">
            <strong> Télécharger :</strong>{" "}
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>
              la question au format XML à importer directement sur Moodle ;
            </li>
            <li>
              le code HTML à copier-coller directement dans l&apos;éditeur de
              Moodle
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <a
              href="/files/exercice1-question-cloze.xml"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
              download
            >
              Question Moodle XML
            </a>
            <a
              href="/files/exercice1-question-cloze.html"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
              download
            >
              Code HTML
            </a>
          </div>
        </div>

        {/* Prompts intégrés dans la section enseignants */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">
            Des exemples de prompts <em>mistral.ai</em> pour générer les
            contenus de l&apos;exercice{" "}
          </h3>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <ol className="list-none pl-0 space-y-3">
              <li>
                <a
                  href="https://chat.mistral.ai/chat/e6f0e0df-d13f-44cd-b896-8eb7625f42a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Prompt pour générer le code HTML du graphique à intégrer dans
                  Moodle
                </a>
              </li>

              <li>
                <a
                  href="https://chat.mistral.ai/chat/3afe7def-7002-4492-8f18-2d78697ea187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Prompt pour générer le texte à compléter au format Question
                  Cloze
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
