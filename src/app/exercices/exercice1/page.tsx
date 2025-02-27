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
  const originalText = `Alors que les indépendants représentaient encore {1:NUMERICAL:=18,6} % de la population active occupée en 1982, ils ne représentent plus que {2:NUMERICAL:=12,6} % des personnes en emploi en 2021, soit une baisse de {3:NUMERICAL:=6} points de % . Le processus de salarisation, observé après la seconde guerre mondiale, s'est donc poursuivi depuis le début des années 1980. Cependant, depuis le milieu des années 2010, on assiste à un rebond du travail indépendant qui atteint en 2021 son plus haut niveau depuis 1999. Ce mouvement est porté notamment par le statut des micro-entrepreneurs qui représentent {4:NUMERICAL:=3,0} % de l'emploi en 2021. La part des indépendants est plus élevée pour les hommes ({5:NUMERICAL:=15,6} %, contre {6:NUMERICAL:=9,5} % des femmes) et les 50 ans ou plus ({7:NUMERICAL:=16,5} %, contre {8:NUMERICAL:=11,8} % des 25-49 ans et {9:NUMERICAL:=3,8} % des 15-24 ans).

Avec {10:NUMERICAL:=87,4} % des personnes en emploi en 2021, le salariat reste la forme d'emploi largement majoritaire, principalement dans le cadre d'emplois à durée indéterminée : {11:NUMERICAL:=73,7} % des personnes en emploi sont soit en contrat à durée indéterminée (CDI), soit fonctionnaires. La part des emplois à durée indéterminée est plus élevée pour les femmes ({12:NUMERICAL:=75,8} %, contre {13:NUMERICAL:=71,7} % des hommes).

En 2021, les emplois en contrat à durée déterminée (CDD) ou en intérim représentent {14:NUMERICAL:=9,8~=9,7} % de l'emploi total ({15:NUMERICAL:=7,7} % pour les CDD et {16:NUMERICAL:=2,0} % pour l'intérim). Les femmes sont plus souvent que les hommes en CDD ({17:NUMERICAL:=9,5} % contre {18:NUMERICAL:=6,0} %), que ces contrats soient de moins de trois mois ou d'une durée plus longue ; elles sont en revanche moins souvent qu'eux intérimaires ({19:NUMERICAL:=1,3} % contre {20:NUMERICAL:=2,7} %). Les moins de 25 ans sont plus fréquemment en CDD ({21:NUMERICAL:=21,0} %), en intérim ({22:NUMERICAL:=5,6} %), en alternance ou en stage ({23:NUMERICAL:=26,7} %). En effet, les 15-24 ans présents sur le marché du travail ont terminé tôt leurs études et sont souvent peu diplômés ou suivent encore des études professionnalisantes.

Après trois années de repli, accentué en 2020 par la crise sanitaire liée à l'épidémie de Covid-19, la part de personnes en emploi à durée limitée (CDD, intérim) augmente à nouveau modérément en 2021 : + {24:NUMERICAL:=0,4} point. Elle demeure toutefois inférieure à son pic de 2017 ({25:NUMERICAL:=11,0} %).`;

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
