/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PIBGrowthChart from "@/components/PIBGrowthChart";

export default function Exercice4() {
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptCount((prev) => prev + 1);

    // Le mot secret est "Livre"
    const isAnswerCorrect = userInput.trim().toLowerCase() === "livre";
    setIsCorrect(isAnswerCorrect);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        {/* Lien de retour vers la page d'accueil */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-900 mr-3 font-medium"
            >
              &larr; Retour aux exercices
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Exercice 4 - Traiter des données statistiques avec un tableur
          </h1>
          <p className="text-gray-700">
            Cet exercice vous permettra de travailler sur des données
            économiques réelles en utilisant un tableur. Vous allez manipuler
            les données du PIB français et calculer des taux de croissance.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-8">
            <p className="mb-6 text-gray-700">
              Le graphique suivant représente les taux de croissance du PIB en
              volume de la France de 1950 à 2023. Ces données illustrent
              l'évolution de l'économie française sur plus de 70 ans, marquée
              par des périodes de forte croissance et de récession.
            </p>

            {/* Graphique */}
            <div className="my-8 text-center">
              <h2 className="text-xl font-bold mb-4">
                Évolution du produit intérieur brut (en volume)
              </h2>

              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <PIBGrowthChart height={450} />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
              <ol className="list-decimal pl-5 space-y-6">
                <li className="font-medium">
                  <span className="font-bold">Préparation :</span> Téléchargez
                  la feuille de calcul dans le format de votre choix (XLSX pour
                  Microsoft Excel, ODS pour LibreOffice).
                  <div className="flex flex-wrap gap-4 mt-3">
                    <a
                      href="/files/traam-pib-en-volume-1950-2023-version-eleve.xlsx"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors inline-block"
                      download
                    >
                      Télécharger au format XLSX
                    </a>
                    <a
                      href="/files/traam-pib-en-volume-1950-2023-version-eleve.ods"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors inline-block"
                      download
                    >
                      Télécharger au format ODS
                    </a>
                  </div>
                </li>

                <li>
                  <span className="font-bold">Calcul :</span> Complétez la
                  troisième colonne en y calculant le taux de croissance du PIB
                  en volume avec la formule appropriée.
                </li>

                <li>
                  <span className="font-bold">Validation :</span> Une fois vos
                  calculs effectués correctement, indiquez le mot secret qui
                  apparaît dans la cellule E2.
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col gap-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Entrez le mot secret..."
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isCorrect === true}
                      />
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded font-medium transition-colors ${
                          isCorrect === true
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        disabled={isCorrect === true}
                      >
                        Vérifier
                      </button>
                    </div>

                    {isCorrect !== null && (
                      <div
                        className={`mt-2 p-3 rounded ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect
                          ? "Félicitations ! Vous avez trouvé le mot secret. Vous pouvez maintenant passer à l'étape suivante."
                          : `Essai ${attemptCount} : Ce n'est pas le bon mot. Vérifiez vos calculs et assurez-vous de lire exactement ce qui apparaît dans la cellule E2.`}
                      </div>
                    )}
                  </form>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* Section pour les professeurs */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Pour les professeurs
          </h2>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
            <p className="text-gray-700 mb-3">
              <strong> Télécharger :</strong>{" "}
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>
                la version professeur de la feuille de calcul avec les solutions
                ;
              </li>
              <li>
                la question au format XML à importer directement sur Moodle ;
              </li>
              <li>
                le code HTML à copier-coller directement dans l'éditeur de
                Moodle
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href="/files/traam-pib-en-volume-1950-2023-version-prof.ods"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
                download
              >
                Version professeur ODS
              </a>

              <a
                href="/files/question-cloze-pib.xml"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
                download
              >
                Question Moodle XML
              </a>
              <a
                href="/files/question-cloze-pib.html"
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
              contenus de l'exercice{" "}
            </h3>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <ol className="list-none pl-0 space-y-3">
                <li>
                  <a
                    href="https://chat.mistral.ai/chat/9901a240-7128-48f9-b73b-94a4b5bdaa0c"
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
                    Prompt pour générer le code HTML du graphique à intégrer
                    dans Moodle
                  </a>
                </li>

                <li>
                  <a
                    href="https://chat.mistral.ai/chat/9bb65f32-f887-466b-9a1c-6856a876a08c"
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
                    Prompt pour créer la question de validation avec le mot
                    secret (Question Cloze)
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
