/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Exercice2() {
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
            Retour à l'accueil
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Exercice 2</h1>

          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-blue-700 dark:text-blue-300">
              Ceci est un exemple de page pour l'exercice 2. Le contenu de
              l'exercice sera développé ici.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Instructions pour l'exercice 2. Vous pouvez décrire ici ce que
              l'élève doit faire.
            </p>

            {/* Placeholder pour le contenu de l'exercice */}
            <div className="my-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Le contenu interactif de l'exercice sera développé ici.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Vérifier mes réponses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
