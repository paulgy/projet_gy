// src/app/parcours/[parcoursSlug]/layout.tsx
import React from "react";
import Link from "next/link"; // Importez le composant Link de Next.js

// Vous n'avez plus besoin de getParcoursMeta ici SI vous n'utilisez plus le titre
// import { getParcoursMeta } from "@/data/parcoursData"; // Commentez ou supprimez si non utilisé ailleurs

export default function ParcoursLayout({
  children,
}: // params n'est plus nécessaire ici si on n'utilise plus le slug pour le titre
// params,
{
  children: React.ReactNode;
  // params: { parcoursSlug: string }; // Plus nécessaire si titre enlevé
}) {
  // const slug = params.parcoursSlug; // Plus nécessaire
  // const meta = getParcoursMeta(slug); // Plus nécessaire
  // const titreParcours = meta ? meta.titre : `Parcours: ${slug}`; // Plus nécessaire

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* --- Élément de Retour à l'Accueil Ajouté --- */}
        <div className="mb-6">
          {" "}
          {/* Ajoute une marge en dessous du lien */}
          <Link
            href="/" // Lien vers la page d'accueil
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center" // Style du lien
          >
            {/* Icône flèche optionnelle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>
        </div>
        {/* --- Fin de l'élément de Retour --- */}

        {/* Le titre H1 a été SUPPRIMÉ */}
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">{titreParcours}</h1> */}

        {/* Le contenu de la page (étape du parcours) est rendu ici */}
        <div className="parcours-content">{children}</div>
      </div>
    </div>
  );
}
