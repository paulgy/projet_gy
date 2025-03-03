"use client";

import Link from "next/link";
import QuestionCloze from "@/components/QuestionCloze";
import { parseClozeText } from "@/utils/clozeParser";
import { useState } from "react";

export default function Exercice1() {
  // État pour suivre la progression (peut être utilisé ultérieurement)
  const [completionInfo, setCompletionInfo] = useState({
    isCompleted: false,
    score: { correct: 0, total: 0 },
  });

  // Le texte original au format Moodle
  const originalText = `Alors que les indépendants représentaient encore {1:NUMERICAL:=18,6} % de la population active occupée en 1982, ils ne représentent plus que {2:NUMERICAL:=12,6} % des personnes en emploi en 2021, soit une baisse de {3:NUMERICAL:=6} points de % .`;

  // Les URLs des iframes
  const iframeUrls = [
    "https://filedn.eu/lOfC7DjLyXz7Y55GpTvy4lB/tle_chap1/partcdd.html",
    "https://filedn.eu/lOfC7DjLyXz7Y55GpTvy4lB/tle_chap1/Statut%20et%20type%20de%20contrat%20des%20personnes%20en%20emploi.html",
  ];

  // Les hauteurs des iframes
  const iframeHeights = [600, 650];

  // L'instruction pour l'exercice
  const instructions =
    "<strong>À l'aide des données statistiques ci-dessus, complétez le texte suivant :</strong><br><em>Pour les réponses numériques, utilisez un point ou une virgule comme séparateur décimal (ex: 12,5 ou 12.5)</em>";

  // Parser le texte Cloze
  const { text, fields } = parseClozeText(originalText);

  // Fonction appelée lorsque l'exercice est complété
  const handleComplete = (correct: number, total: number) => {
    setCompletionInfo({
      isCompleted: true,
      score: { correct, total },
    });

    // Vous pourriez ajouter ici du code pour enregistrer la progression,
    // afficher un message de félicitations, etc.
    console.log(`Exercice complété avec un score de ${correct}/${total}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
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
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Exercice 1 : Le travail indépendant et le salariat en France
            </h1>

            {completionInfo.isCompleted && (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-md">
                Score:{" "}
                <span className="font-bold">
                  {completionInfo.score.correct}/{completionInfo.score.total}
                </span>
              </div>
            )}
          </div>

          {/* Composant QuestionCloze */}
          <QuestionCloze
            instructions={instructions}
            text={text}
            fields={fields}
            iframeUrls={iframeUrls}
            iframeHeights={iframeHeights}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}
