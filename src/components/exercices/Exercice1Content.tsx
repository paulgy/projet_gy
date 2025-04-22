// src/components/exercices/Exercice1Content.tsx
"use client";

import { useState } from "react";
import ClozeQuestion from "@/components/ClozeQuestion";
import type { Segment } from "@/components/ClozeQuestion";
import EmploymentStatusChart from "@/components/EmploymentStatusChart";

// Type pour les données d'exercice (copié)
type ExerciseData = {
  title: string;
  description: string;
  segments: Segment[];
};

export default function Exercice1Content() {
  // État pour suivre la progression (copié)
  const [isCompleted, setIsCompleted] = useState(false);
  // État pour compter les tentatives (copié)
  const [attempts, setAttempts] = useState(0);

  // Les données de l'exercice (copiées)
  const exerciseData: ExerciseData = {
    title: "Le travail indépendant et le salariat en France", // Vous pourriez vouloir enlever "Exercice 1:" du titre ici si le layout du parcours l'ajoute
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

  // Fonction appelée lorsque l'exercice est complété (copiée)
  const handleCompletion = () => {
    setIsCompleted(true);
    setAttempts((prev) => prev + 1);
    console.log("Exercice complété avec succès !");
  };

  // JSX principal (copié, SANS le lien retour et SANS la section prof)
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        {/* Titre ajusté potentiellement */}
        <h1 className="text-3xl font-bold">{exerciseData.title}</h1>

        <div className="flex items-center space-x-4">
          {attempts > 0 && (
            <div className="text-sm text-gray-600">Tentatives : {attempts}</div>
          )}
          {isCompleted && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
              Exercice complété !
            </div>
          )}
        </div>
      </div>

      {/* Description de l'exercice (copiée) */}
      <div className="mb-6">
        <p className="text-gray-700">
          Cet exercice vous propose d&apos;analyser l&apos;évolution du travail
          indépendant en France depuis les années 1980 jusqu&apos;à
          aujourd&apos;hui. Observez attentivement le graphique ci-dessous puis
          complétez le texte d&apos;analyse.
        </p>
      </div>

      {/* Graphique (copié) */}
      <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-center">
          Graphique – Part des indépendants, des CDD et des intérimaires dans
          l&apos;emploi de 1982 à 2023
        </h2>
        <EmploymentStatusChart height={450} />
      </div>

      {/* Composant ClozeQuestion (copié) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          À partir des données du graphique, complétez le texte suivant :
        </h2>
        <ClozeQuestion
          segments={exerciseData.segments}
          onComplete={handleCompletion}
        />
      </div>

      {/* Notes (copiées) */}
      <div className="mt-8 text-sm text-gray-600">
        <p>
          Note : Vous pouvez survoler le graphique avec votre souris afficher
          les valeurs exactes. Pour les calculs, vous pouvez arrondir votre
          résultat à un chiffre après la virgule.
        </p>
      </div>
    </div>
  );
}
