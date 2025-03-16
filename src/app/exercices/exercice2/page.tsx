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
      </div>
    </div>
  );
}
