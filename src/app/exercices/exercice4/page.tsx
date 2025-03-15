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
                      href="https://ent2d.ac-bordeaux.fr/disciplines/ses/wp-content/uploads/sites/9/2025/01/traam-pib-en-volume-1950-2023-version-élève.xlsx"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger au format XLSX
                    </a>
                    <a
                      href="https://ent2d.ac-bordeaux.fr/disciplines/ses/wp-content/uploads/sites/9/2025/01/traam-pib-en-volume-1950-2023-version-élève.ods"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger au format ODS
                    </a>
                  </div>
                </li>

                <li>
                  <span className="font-bold">Calcul :</span> Dans la troisième
                  colonne, calculez le taux de croissance du PIB en volume en
                  utilisant la formule appropriée.
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

                <li>
                  <span className="font-bold">Visualisation :</span> Reproduisez
                  le graphique ci-dessus à partir de vos données calculées :
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Utilisez un graphique en courbe</li>
                    <li>
                      Placez les années en abscisse et les taux de croissance en
                      ordonnée
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Aide supplémentaire (optionnel) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Conseils pour réussir l'exercice
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">
                Comment calculer un taux de croissance ?
              </h3>
              <p className="text-gray-700">
                Le taux de croissance permet de mesurer l'évolution d'une
                grandeur entre deux périodes. La formule de calcul est :
                ((Valeur finale - Valeur initiale) / Valeur initiale) × 100
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Dans le tableur</h3>
              <p className="text-gray-700">
                Si vous avez la valeur du PIB de l'année t dans la cellule B2 et
                celle de l'année t-1 dans la cellule B1, la formule sera :
                =(B2-B1)/B1*100
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Pourquoi le taux de croissance est-il important ?
              </h3>
              <p className="text-gray-700">
                Le taux de croissance du PIB est un indicateur clé de la santé
                économique d'un pays. Une croissance positive soutenue indique
                généralement une économie en expansion, tandis qu'une croissance
                négative sur deux trimestres consécutifs définit techniquement
                une récession.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
