// src/app/parcours/[parcoursSlug]/[etapeNumero]/page.tsx
import React from "react";
import Link from "next/link";

// Importez les composants d'exercices
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";

// Importez le composant optionnel pour les profs
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";

// Importez la fonction ET les données depuis le fichier centralisé
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData";

// --- DÉFINITION DE L'INTERFACE POUR LES PROPS DE LA PAGE ---
interface EtapePageProps {
  params: {
    parcoursSlug: string;
    etapeNumero: string;
  };
  // Optionnel mais bonne pratique : inclure searchParams même si non utilisé
  searchParams?: { [key: string]: string | string[] | undefined };
}
// --- FIN DE LA DÉFINITION DE L'INTERFACE ---

// --- UTILISATION DE L'INTERFACE DANS LA SIGNATURE DE LA FONCTION ---
export default function EtapePage({ params }: EtapePageProps) {
  const { parcoursSlug, etapeNumero } = params;
  const etapeCourante = parseInt(etapeNumero, 10);

  const meta = getParcoursMeta(parcoursSlug); // Utilise la fonction importée

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

  const totalEtapes = meta.etapes; // Calcul basé sur le meta obtenu

  // --- Sélection du Composant d'Exercice ---
  let ExerciceComponent: React.ComponentType | null = null;
  if (parcoursSlug === "travail-independant-salariat-france") {
    if (etapeCourante === 1) {
      ExerciceComponent = Exercice1Content;
    } else if (etapeCourante === 2) {
      ExerciceComponent = Exercice2Content;
    }
    // Ajoutez d'autres étapes ici si nécessaire
  }
  // Ajoutez d'autres `else if` pour d'autres parcours ici
  // else if (parcoursSlug === 'autre-parcours') { ... }

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
  // --- Fin de la Sélection ---

  // --- Calcul pour la Navigation ---
  const etapePrecedente = etapeCourante > 1 ? etapeCourante - 1 : null;
  const etapeSuivante = etapeCourante < totalEtapes ? etapeCourante + 1 : null;
  // --- Fin du Calcul Navigation ---

  return (
    <div className="etape-container p-4 md:p-8 max-w-4xl mx-auto">
      {" "}
      {/* Ajout de padding et max-width pour une meilleure présentation */}
      <h1 className="text-2xl font-bold mb-6">
        {meta.titre} - Étape {etapeCourante}
      </h1>{" "}
      {/* Ajout d'un titre */}
      {/* Affiche le contenu de l'exercice spécifique */}
      <div className="mb-8">
        {" "}
        {/* Ajout d'une marge sous le contenu */}
        <ExerciceComponent />
      </div>
      {/* --- Navigation Précédent/Suivant --- */}
      <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center">
        {etapePrecedente ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapePrecedente}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" // Style exemple
          >
            &larr; Étape Précédente
          </Link>
        ) : (
          <div aria-hidden="true" className="px-6 py-2 invisible"></div> // Garde l'espacement
        )}
        <span className="text-gray-600 text-sm font-medium">
          {" "}
          {/* Style exemple */}
          Étape {etapeCourante} sur {totalEtapes}
        </span>
        {etapeSuivante ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapeSuivante}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" // Style exemple
          >
            Étape Suivante &rarr;
          </Link>
        ) : (
          <span className="px-6 py-2 text-gray-500 italic">
            Fin du parcours
          </span>
        )}
      </div>
      {/* --- Fin de la Navigation --- */}
      {/* --- Section Professeur Conditionnelle --- */}
      {parcoursSlug === "travail-independant-salariat-france" &&
        etapeCourante === 1 && (
          <div className="mt-12 pt-6 border-t border-dashed border-gray-400">
            {" "}
            {/* Marge et séparateur */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Ressources Professeur
            </h2>{" "}
            {/* Titre section */}
            <ProfessorResourcesExercice1 />
          </div>
        )}
      {/* --- Fin Section Professeur --- */}
    </div>
  );
}

// --- generateStaticParams reste inchangé, il semble correct ---
export async function generateStaticParams(): Promise<
  { parcoursSlug: string; etapeNumero: string }[]
> {
  // Ajout du type de retour explicite
  const paths: { parcoursSlug: string; etapeNumero: string }[] = [];

  for (const slug in parcoursMetaData) {
    const meta = parcoursMetaData[slug];
    if (meta) {
      for (let i = 1; i <= meta.etapes; i++) {
        paths.push({ parcoursSlug: slug, etapeNumero: i.toString() });
      }
    }
  }
  console.log("Generated static paths:", paths); // Optionnel: pour débugger pendant le build
  return paths;
}
