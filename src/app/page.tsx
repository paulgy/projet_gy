/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Exercices interactifs SES</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Plateforme d'exercices pour lycéens en Sciences Économiques et
          Sociales
        </p>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Exercices disponibles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Carte pour l'exercice 1 */}
            <Link href="/exercices/exercice1" className="block">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500">
                <h3 className="text-xl font-medium mb-2">
                  Exercice 1 : Le travail indépendant et le salariat en France
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complétez le texte à trous sur les statistiques du travail
                  indépendant et du salariat en France.
                </p>
                <div className="text-blue-600 dark:text-blue-400 flex items-center">
                  Commencer l'exercice
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Carte pour l'exercice 2 */}
            <Link href="/exercices/exercice2" className="block">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500">
                <h3 className="text-xl font-medium mb-2">Exercice 2</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Description courte de l'exercice 2. Cliquez pour commencer.
                </p>
                <div className="text-blue-600 dark:text-blue-400 flex items-center">
                  Commencer l'exercice
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
            
            {/* Carte pour l'exercice 3 */}
            <Link href="/exercices/exercice3" className="block">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500">
                <h3 className="text-xl font-medium mb-2">
                  Exercice 3 : Analyse démographique
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complétez le texte à trous sur les données démographiques de la France en analysant les statistiques.
                </p>
                <div className="text-blue-600 dark:text-blue-400 flex items-center">
                  Commencer l'exercice
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-4xl py-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} - Exercices interactifs SES</p>
      </footer>
    </div>
  );
}
