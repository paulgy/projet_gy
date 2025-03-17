/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import EmploymentStatusTable from "@/components/EmploymentStatusTable";
import ClozeQuestion from "@/components/ClozeQuestion";
import type { Segment } from "@/components/ClozeQuestion";

// Type pour les données d'exercice
type ExerciseData = {
  title: string;
  description: string;
  segments: Segment[];
};

export default function Exercice2() {
  // État pour suivre la progression
  const [isCompleted, setIsCompleted] = useState(false);
  // État pour compter les tentatives
  const [attempts, setAttempts] = useState(0);

  // Les données de l'exercice
  const exerciseData: ExerciseData = {
    title: "Analyse des contrats de travail",
    description:
      "Complétez le texte suivant en analysant les données du tableau ci-dessous.",
    segments: [
      {
        type: "text",
        content: "Avec ",
      },
      {
        type: "blank",
        id: "salariat_pct",
        answerType: "number",
        correct: 87.1,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " % des personnes en emploi en 2023, le salariat reste la forme d'emploi largement majoritaire, principalement dans le cadre d'emplois à durée indéterminée : ",
      },
      {
        type: "blank",
        id: "cdi_pct",
        answerType: "number",
        correct: 73.0,
        tolerance: 0.1,
      },
      {
        type: "text",
        content:
          " % des personnes en emploi sont soit en contrat à durée indéterminée (CDI), soit fonctionnaires. La part des emplois à durée indéterminée est plus élevée pour les femmes (",
      },
      {
        type: "blank",
        id: "femmes_pct",
        answerType: "number",
        correct: 74.6,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " %, contre ",
      },
      {
        type: "blank",
        id: "hommes_pct",
        answerType: "number",
        correct: 71.4,
        tolerance: 0.1,
      },
      {
        type: "text",
        content: " % des hommes).",
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
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-900 mr-3 font-medium"
            >
              &larr; Retour aux exercices
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Exercice 2 - {exerciseData.title}
          </h1>
          <p className="text-gray-700">
            Cet exercice vous propose d'analyser les statistiques officielles de
            l'INSEE concernant les statuts d'emploi et types de contrats des
            personnes en emploi en France en 2023.
          </p>

          <div className="flex justify-end items-center mt-4 space-x-4">
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

        {/* Tableau */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <EmploymentStatusTable />
        </div>

        {/* Composant ClozeQuestion */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            À partir des données du tableau, complétez le texte suivant :
          </h2>
          <ClozeQuestion
            segments={exerciseData.segments}
            onComplete={handleCompletion}
          />

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
