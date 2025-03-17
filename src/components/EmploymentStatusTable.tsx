"use client";

import React from "react";

const EmploymentStatusTable: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Titre du tableau */}
      <h3 className="text-2xl font-bold text-blue-800 mb-2">
        Tableau – Statut et type de contrat des personnes en emploi en 2023
      </h3>

      {/* Unité en % */}
      <div className="text-right text-gray-600 mb-1">en %</div>

      {/* Tableau */}
      <div className="border border-gray-300 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-left font-medium w-1/3">
                  Statut d&apos;emploi et type de contrat
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  Ensemble
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  Femmes
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  Hommes
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  15-
                  <br />
                  24 ans
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  25-
                  <br />
                  49 ans
                </th>
                <th className="bg-gray-600 text-white border border-gray-300 p-1.5 text-center font-medium w-1/9">
                  50 ans
                  <br />
                  ou plus
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Indépendants, dont : */}
              <tr className="bg-blue-100">
                <th className="border border-gray-300 p-1.5 text-left font-medium">
                  Indépendants, dont :
                </th>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  12,9
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  10,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  15,5
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  3,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  12,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  16,5
                </td>
              </tr>

              {/* micro-entrepreneurs */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left pl-6">
                  micro-entrepreneurs
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,3
                </td>
              </tr>

              {/* Salariés */}
              <tr className="bg-blue-100">
                <th className="border border-gray-300 p-1.5 text-left font-medium">
                  Salariés
                </th>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  87,1
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  89,8
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  84,5
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  97,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  87,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  83,5
                </td>
              </tr>

              {/* Emploi à durée indéterminée */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left">
                  Emploi à durée indéterminée
                  <br />
                  (CDI, fonctionnaires)
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  73,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  74,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  71,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  42,1
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  76,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  76,2
                </td>
              </tr>

              {/* CDD, dont : */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left">
                  Contrat à durée déterminée
                  <br />
                  (CDD), dont :
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  7,9
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  9,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  6,1
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  18,1
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  7,7
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  5,0
                </td>
              </tr>

              {/* CDD de moins de 3 mois */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left pl-6">
                  CDD de moins de
                  <br />3 mois
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  2,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  2,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,7
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  6,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,7
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,2
                </td>
              </tr>

              {/* Intérim */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left">
                  Intérim
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  2,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,3
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  2,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  5,5
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,8
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,2
                </td>
              </tr>

              {/* Alternance, stage */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left">
                  Alternance, stage
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,2
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  3,6
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  28,9
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  0,0
                </td>
              </tr>

              {/* Sans contrat ou contrat inconnu */}
              <tr className="bg-white">
                <th className="border border-gray-300 p-1.5 text-left">
                  Sans contrat ou contrat
                  <br />
                  inconnu
                </th>
                <td className="border border-gray-300 p-1.5 text-center">
                  0,9
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  0,7
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  2,4
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  0,5
                </td>
                <td className="border border-gray-300 p-1.5 text-center">
                  1,1
                </td>
              </tr>

              {/* Ensemble */}
              <tr className="bg-blue-100">
                <th className="border border-gray-300 p-1.5 text-left font-medium">
                  Ensemble
                </th>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
                <td className="border border-gray-300 p-1.5 text-center font-medium">
                  100,0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes et sources */}
      <div className="mt-2 text-gray-700 space-y-1 text-sm">
        <p>
          Lecture : En 2023, 15,5 % des hommes en emploi ont le statut
          d&apos;indépendant pour leur emploi principal.
        </p>
        <p>
          Champ : France hors Mayotte, personnes vivant en logement ordinaire,
          en emploi.
        </p>
        <p className="italic">Source : Insee, enquête Emploi 2023.</p>
      </div>
    </div>
  );
};

export default EmploymentStatusTable;
