/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { parcoursMetaData } from "@/data/parcoursData"; // AJOUT: Importer les métadonnées

export default function Home() {
  // AJOUT: Définir les infos pour le nouveau parcours

  const nouveauParcours = {
    slug: "lecture-interpretation-donnees-ia", // Le slug que nous avons défini
    title: parcoursMetaData["lecture-interpretation-donnees-ia"].titre, // Titre depuis parcoursMetaData
    description:
      "S'exercer à la lecture et l'analyse d'un document statistique à l'aide de l'IA.", // Description suggérée
  };

  const parcoursPrincipal = {
    slug: "travail-independant-salariat-france",
    title: parcoursMetaData["travail-independant-salariat-france"].titre, // Utilisation de parcoursMetaData
    description: "Analyser l'évolution de la structure de l'emploi.",
  };

  // --- Fin de la définition ---

  return (
    <div className="min-h-screen flex flex-col items-center p-8 relative">
      {/* Bouton Diaporama (inchangé) */}
      <div className="absolute top-4 right-4">
        {/* ... (code du bouton Diaporama inchangé) ... */}
        <Link
          href="https://diaporamas.gyselinck.fr"
          className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v8h12V4H4z"
              clipRule="evenodd"
            />
            <path d="M4 12h12v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          </svg>
          Diaporama
        </Link>
      </div>

      {/* Header (inchangé) */}
      <header className="w-full max-w-4xl mb-12 text-center">
        {/* ... (code du header inchangé) ... */}
        <h1 className="text-3xl font-bold mb-4">
          Activités interactives en SES
        </h1>
        <p className="text-lg text-gray-600 ">
          Expérimentations pour les TraAM 2024-2025
        </p>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Activités Disponibles</h2>
          {/* Grille md:grid-cols-2. Une 5ème carte ira sur une nouvelle ligne sur md et plus grand. */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* --- AJOUT: CARTE POUR LE NOUVEAU PARCOURS --- */}
            <Link
              href={`/parcours/${nouveauParcours.slug}/1`}
              className="block"
            >
              <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400">
                <h3 className="text-xl font-medium mb-2">
                  {(() => {
                    const title = nouveauParcours.title;
                    const keyword = "Mistral AI";
                    const parts = title.split(keyword);
                    if (parts.length === 2) {
                      return (
                        <>
                          {parts[0]}
                          <span className="font-semibold text-orange-600">
                            {keyword}
                          </span>
                          {parts[1]}
                        </>
                      );
                    }
                    return title; // Fallback si le mot-clé n'est pas trouvé
                  })()}
                </h3>
                <p className="text-gray-600 mb-4">
                  {nouveauParcours.description}
                </p>
                <div className="text-blue-600 flex items-center">
                  Commencer le parcours
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
            {/* --- CARTE 1 : Le Parcours Principal (INCHANGÉ DANS SA STRUCTURE) --- */}
            <Link
              href={`/parcours/${parcoursPrincipal.slug}/1`}
              className="block"
            >
              <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400">
                <h3 className="text-xl font-medium mb-2">
                  {parcoursPrincipal.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {parcoursPrincipal.description}
                </p>
                <div className="text-blue-600 flex items-center">
                  Commencer le parcours
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

            {/* --- CARTE : Exercice 3 (anciennement CARTE 2) --- */}
            <Link href="/exercices/exercice3" className="block">
              {/* ... (contenu de la carte Exercice 3 inchangé) ... */}
              <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400">
                <h3 className="text-xl font-medium mb-2">
                  Lire et interpréter des évolutions exprimées en indices
                </h3>
                <p className="text-gray-600 mb-4">
                  Analyser l'évolution des salaires selon la catégorie
                  socioprofessionnelle
                </p>
                <div className="text-blue-600 flex items-center">
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

            {/* --- CARTE : Exercice 4 (anciennement CARTE 3) --- */}
            <Link href="/exercices/exercice4" className="block">
              {/* ... (contenu de la carte Exercice 4 inchangé) ... */}
              <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-blue-400">
                <h3 className="text-xl font-medium mb-2">
                  Traiter des données statistiques avec un tableur
                </h3>
                <p className="text-gray-600 mb-4">
                  Manipuler les données du PIB français avec un tableur et
                  calculer des taux de croissance.
                </p>
                <div className="text-blue-600 flex items-center">
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
          </div>{" "}
          {/* Fin de la grille */}
        </section>
      </main>

      {/* Footer (inchangé) */}
      <footer className="w-full max-w-4xl py-6 border-t border-gray-200 text-center text-gray-600">
        {/* ... (code du footer inchangé) ... */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center">
            <a
              href="https://creativecommons.org/licenses/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M245.83 214.87l-33.22 17.28c-9.43-19.58-25.24-19.93-27.46-19.93-22.13 0-33.22 14.61-33.22 43.84 0 23.57 9.21 43.84 33.22 43.84 14.47 0 24.65-7.09 30.57-21.26l30.55 15.5c-6.17 11.51-25.69 38.98-65.1 38.98-22.6 0-73.96-10.32-73.96-77.05 0-58.69 43-77.06 72.63-77.06 30.72-.01 52.7 11.95 65.99 35.86zm143.05 0l-32.78 17.28c-9.5-19.77-25.72-19.93-27.9-19.93-22.14 0-33.22 14.61-33.22 43.84 0 23.55 9.23 43.84 33.22 43.84 14.45 0 24.65-7.09 30.54-21.26l31 15.5c-2.1 3.75-21.39 38.98-65.09 38.98-22.69 0-73.96-9.87-73.96-77.05 0-58.67 42.97-77.06 72.63-77.06 30.71-.01 52.58 11.95 65.56 35.86zM247.56 8.05C104.74 8.05 0 123.11 0 256.05c0 138.49 113.6 248 247.56 248 129.93 0 248.44-100.87 248.44-248 0-137.87-106.62-248-248.44-248zm.87 450.81c-112.54 0-203.7-93.04-203.7-202.81 0-105.42 85.43-203.27 203.72-203.27 112.53 0 202.82 89.46 202.82 203.26-.01 121.69-99.68 202.82-202.84 202.82z"
                />
              </svg>
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} - Ce contenu est sous licence{" "}
            <a
              href="https://creativecommons.org/licenses/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Creative Commons
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
