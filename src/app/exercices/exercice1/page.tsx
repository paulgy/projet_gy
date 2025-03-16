"use client";

import Link from "next/link";
import QuestionCloze from "@/components/QuestionCloze";
import EmploymentStatusChart from "@/components/EmploymentStatusChart";
import { parseClozeText } from "@/utils/clozeParser";
import { useState } from "react";

export default function Exercice1() {
  // État pour suivre la progression
  const [completionInfo, setCompletionInfo] = useState({
    isCompleted: false,
    score: { correct: 0, total: 0 },
  });

  // Le texte à compléter au format Moodle Cloze
  const originalText = `Alors que les indépendants représentaient encore {1:NUMERICAL:=18,6} % de la population active occupée en 1982, ils ne représentent plus que {2:NUMERICAL:=12,9} % des personnes en emploi en 2023, soit une baisse de {3:NUMERICAL:=5,7} points de % . Le processus de salarisation, observé après la seconde guerre mondiale, s'est donc poursuivi depuis le début des années 1980. Cependant, depuis le milieu des années 2010, on assiste à un rebond du travail indépendant qui atteint en {4:NUMERICAL:=2022} son plus haut niveau (13,1 %) depuis 1999.`;

  // L'instruction pour l'exercice
  const instructions =
    "<strong>À l'aide du graphique ci-dessus, complétez le texte suivant :</strong><br><em>Pour les réponses numériques, utilisez un point ou une virgule comme séparateur décimal (ex: 12,5 ou 12.5)</em>";

  // Parser le texte Cloze
  const { text, fields } = parseClozeText(originalText);

  // Fonction appelée lorsque l'exercice est complété
  const handleComplete = (correct: number, total: number) => {
    setCompletionInfo({
      isCompleted: true,
      score: { correct, total },
    });

    console.log(`Exercice complété avec un score de ${correct}/${total}`);
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
              Exercice 1 : Le travail indépendant et le salariat en France
            </h1>

            {completionInfo.isCompleted && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                Score:{" "}
                <span className="font-bold">
                  {completionInfo.score.correct}/{completionInfo.score.total}
                </span>
              </div>
            )}
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
              Figure 2 – Part des indépendants, des CDD et des intérimaires dans
              l&apos;emploi de 1982 à 2023
            </h2>
            <EmploymentStatusChart height={450} />
          </div>

          {/* Tableau complémentaire avec quelques points clés */}
          <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">
              Données clés sur le travail indépendant
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Période
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Caractéristiques
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      1982-2008
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Déclin continu du travail indépendant, passant de 18,6% à
                      10,7% (-7,9 points)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      2008-2015
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Légère remontée puis stabilisation autour de 11,6%
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      2015-2022
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Nouvelle hausse significative jusqu&apos;à 13,1% en 2022
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      2022-2023
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Légère baisse à 12,9%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Composant QuestionCloze */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <QuestionCloze
              instructions={instructions}
              text={text}
              fields={fields}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
