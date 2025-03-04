/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import EmploymentStatusTable from "@/components/EmploymentStatusTable";

export default function Exercice2() {
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
            Exercice 2 - Analyse des contrats de travail
          </h1>
          <p className="text-gray-700">
            Cet exercice vous propose d'analyser les statistiques officielles de
            l'INSEE concernant les statuts d'emploi et types de contrats des
            personnes en emploi en France en 2023.
          </p>
        </div>

        {/* Tableau */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <EmploymentStatusTable />
        </div>

        {/* Section d'instructions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Consignes</h2>
          <p className="text-gray-700 mb-4">
            À partir des données présentées dans le tableau ci-dessus, répondez
            aux questions suivantes :
          </p>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>
              <p className="font-medium">Question 1</p>
              <p>
                Comparez la proportion d'indépendants selon le sexe. Comment
                expliquez-vous ces différences ?
              </p>
            </li>
            <li>
              <p className="font-medium">Question 2</p>
              <p>
                Analysez la situation particulière des jeunes (15-24 ans) en
                matière de types de contrats. Quelles sont les différences les
                plus marquantes avec les autres tranches d'âge ?
              </p>
            </li>
            <li>
              <p className="font-medium">Question 3</p>
              <p>
                Selon vous, que révèle ce tableau sur la stabilité de l'emploi
                en France ? Appuyez votre réponse sur les données du tableau.
              </p>
            </li>
          </ol>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">
              Rédigez vos réponses en vous appuyant sur une analyse précise des
              données et en utilisant le vocabulaire économique approprié.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
