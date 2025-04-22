// src/app/parcours/[parcoursSlug]/[etapeNumero]/page.tsx
import React from "react";
import Link from "next/link";
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData";

// --- Interface pour les paramètres dynamiques ---
interface EtapePageParams {
  parcoursSlug: string;
  etapeNumero: string;
}

// --- Interface pour les props complètes de la page ---
// (Garder searchParams même si non utilisé pour la conformité potentielle)
interface PageProps {
  params: EtapePageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

// --- RENDRE LA FONCTION DU COMPOSANT ASYNCHRONE ---
export default async function EtapePage({ params }: PageProps) {
  // On récupère les params comme avant
  const { parcoursSlug, etapeNumero } = params;
  const etapeCourante = parseInt(etapeNumero, 10);

  // La logique interne reste synchrone (pas d'await ici)
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

  // Le return contient le JSX comme avant
  return (
    <div className="etape-container p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {meta.titre} - Étape {etapeCourante}
      </h1>

      <div className="mb-8">
        <ExerciceComponent />
      </div>

      <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center">
        {/* ... Navigation ... */}
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

// generateStaticParams reste async, c'est normal
export async function generateStaticParams(): Promise<
  { parcoursSlug: string; etapeNumero: string }[]
> {
  const paths: { parcoursSlug: string; etapeNumero: string }[] = [];
  for (const slug in parcoursMetaData) {
    const meta = parcoursMetaData[slug];
    if (meta) {
      for (let i = 1; i <= meta.etapes; i++) {
        paths.push({ parcoursSlug: slug, etapeNumero: i.toString() });
      }
    }
  }
  // console.log("Generated static paths:", paths); // Décommenter si besoin pour le debug local
  return paths;
}
