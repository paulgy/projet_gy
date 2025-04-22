import React from "react";
import Link from "next/link";
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData";

// Typage des paramètres
type EtapePageParams = {
  parcoursSlug: string;
  etapeNumero: string;
};

// Page component avec async pour être compatible avec Next.js App Router
export default async function EtapePage({
  params,
}: {
  params: EtapePageParams;
}) {
  const { parcoursSlug, etapeNumero } = params;
  const etapeCourante = parseInt(etapeNumero, 10);

  // Obtenir les métadonnées
  const meta = getParcoursMeta(parcoursSlug);

  if (!meta) {
    return (
      <div className="text-center text-red-600 mt-10">
        Parcours &quot;{parcoursSlug}&quot; non trouvé.
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const totalEtapes = meta.etapes;

  // Sélection du composant
  let ExerciceComponent: React.ComponentType | null = null;
  if (parcoursSlug === "travail-independant-salariat-france") {
    if (etapeCourante === 1) {
      ExerciceComponent = Exercice1Content;
    } else if (etapeCourante === 2) {
      ExerciceComponent = Exercice2Content;
    }
  }

  if (!ExerciceComponent) {
    return (
      <div className="text-center text-red-600 mt-10">
        Étape {etapeNumero} non valide pour le parcours &quot;{parcoursSlug}
        &quot;.
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const etapePrecedente = etapeCourante > 1 ? etapeCourante - 1 : null;
  const etapeSuivante = etapeCourante < totalEtapes ? etapeCourante + 1 : null;

  return (
    <div className="etape-container p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {meta.titre} - Étape {etapeCourante}
      </h1>
      <div className="mb-8">
        <ExerciceComponent />
      </div>
      <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center">
        {etapePrecedente ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapePrecedente}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            &larr; Étape Précédente
          </Link>
        ) : (
          <div aria-hidden="true" className="px-6 py-2 invisible"></div>
        )}
        <span className="text-gray-600 text-sm font-medium">
          Étape {etapeCourante} sur {totalEtapes}
        </span>
        {etapeSuivante ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapeSuivante}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Étape Suivante &rarr;
          </Link>
        ) : (
          <span className="px-6 py-2 text-gray-500 italic">
            Fin du parcours
          </span>
        )}
      </div>
      {parcoursSlug === "travail-independant-salariat-france" &&
        etapeCourante === 1 && (
          <div className="mt-12 pt-6 border-t border-dashed border-gray-400">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Ressources Professeur
            </h2>
            <ProfessorResourcesExercice1 />
          </div>
        )}
    </div>
  );
}

// generateStaticParams reste inchangé
export async function generateStaticParams() {
  const paths = [];
  for (const slug in parcoursMetaData) {
    const meta = parcoursMetaData[slug as keyof typeof parcoursMetaData];
    if (
      meta &&
      typeof meta === "object" &&
      "etapes" in meta &&
      typeof meta.etapes === "number"
    ) {
      for (let i = 1; i <= meta.etapes; i++) {
        paths.push({
          parcoursSlug: slug,
          etapeNumero: i.toString(),
        });
      }
    } else {
      console.warn(`Metadata issue for slug: ${slug}`, meta);
    }
  }
  return paths;
}
