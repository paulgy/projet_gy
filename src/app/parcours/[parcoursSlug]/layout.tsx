// src/app/parcours/[parcoursSlug]/layout.tsx
import React from "react";
// Importez la fonction utilitaire et les données
import { getParcoursMeta } from "@/data/parcoursData"; // Ajustez le chemin si nécessaire

export default function ParcoursLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { parcoursSlug: string };
}) {
  const slug = params.parcoursSlug;
  // Récupérez les métadonnées du parcours
  const meta = getParcoursMeta(slug);
  // Utilisez le titre depuis les métadonnées, avec un fallback
  const titreParcours = meta ? meta.titre : `Parcours: ${slug}`;

  return (
    // Le reste de votre layout reste identique (avec min-h-screen, bg-gray-50, max-w-...)
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Le titre est maintenant récupéré depuis les données centralisées */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {titreParcours}
        </h1>
        <div className="parcours-content">{children}</div>
      </div>
    </div>
  );
}
