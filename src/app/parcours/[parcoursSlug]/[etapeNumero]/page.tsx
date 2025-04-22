// src/app/parcours/[parcoursSlug]/[etapeNumero]/page.tsx
import React from "react";
import Link from "next/link";
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData"; // Assurez-vous que getParcoursMeta est synchrone

// --- Interface UNIQUEMENT pour la forme de l'objet params ---
interface EtapePageParams {
  parcoursSlug: string;
  etapeNumero: string;
}

// --- Typage DIRECT de l'argument de la fonction ---
// Pas d'async ici si la logique interne est synchrone
export default function EtapePage({ params }: { params: EtapePageParams }) {
  // params est maintenant garanti d'être du type EtapePageParams
  const { parcoursSlug, etapeNumero } = params;
  const etapeCourante = parseInt(etapeNumero, 10);

  // Logique synchrone pour obtenir les métadonnées
  const meta = getParcoursMeta(parcoursSlug); // Important : s'assurer que cette fonction n'est pas async

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

  // Sélection du composant (logique synchrone)
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

  // Return JSX (synchrone)
  return (
    <div className="etape-container p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {meta.titre} - Étape {etapeCourante}
      </h1>
      {/* ... reste du JSX ... */}
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

// --- generateStaticParams ---
// Utiliser une interface pour clarifier la structure retournée
interface StaticParams {
  parcoursSlug: string;
  etapeNumero: string;
}

// La fonction reste async, c'est correct
export async function generateStaticParams(): Promise<StaticParams[]> {
  const paths: StaticParams[] = [];
  for (const slug in parcoursMetaData) {
    // Assurez-vous que parcoursMetaData est bien typé ou faites une assertion si nécessaire
    const meta = parcoursMetaData[slug as keyof typeof parcoursMetaData];
    if (
      meta &&
      typeof meta === "object" &&
      "etapes" in meta &&
      typeof meta.etapes === "number"
    ) {
      for (let i = 1; i <= meta.etapes; i++) {
        const params: StaticParams = {
          parcoursSlug: slug,
          etapeNumero: i.toString(),
        };
        paths.push(params);
      }
    } else {
      console.warn(`Metadata issue for slug: ${slug}`, meta); // Log d'avertissement si la structure n'est pas celle attendue
    }
  }
  return paths;
}
