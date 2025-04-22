// src/app/parcours/[parcoursSlug]/[etapeNumero]/page.tsx
import React from "react";
import Link from "next/link";

// Importez les composants d'exercices
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";

// Importez le composant optionnel pour les profs
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";

// Importez la fonction ET les données depuis le fichier centralisé
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData"; // Assurez-vous que parcoursMetaData est bien exporté depuis ce fichier

// --- Suppression de la définition locale de l'interface ---
// interface ParcoursMeta { ... } // SUPPRIMÉ D'ICI

export default function EtapePage({
  params,
}: {
  params: { parcoursSlug: string; etapeNumero: string };
}) {
  const { parcoursSlug, etapeNumero } = params;
  const etapeCourante = parseInt(etapeNumero, 10);

  // --- Utilisation de la fonction importée pour obtenir les métadonnées ---
  const meta = getParcoursMeta(params.parcoursSlug); // OK: Utilise la fonction importée
  const totalEtapes = meta ? meta.etapes : 0; // OK: Calcul basé sur le meta précédent

  // Si les métadonnées ne sont pas trouvées pour le slug, c'est une erreur aussi
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

  // --- Sélection du Composant d'Exercice ---
  let ExerciceComponent: React.ComponentType | null = null;
  if (parcoursSlug === "travail-independant-salariat-france") {
    if (etapeCourante === 1) {
      ExerciceComponent = Exercice1Content;
    } else if (etapeCourante === 2) {
      ExerciceComponent = Exercice2Content;
    }
  }
  // else if (parcoursSlug === 'autre-parcours') { ... }

  // Si aucun composant ne correspond (mais le parcours existe)
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

  // --- Calcul pour la Navigation (Utilise le totalEtapes déjà calculé) ---
  // const meta = parcoursMetaData[parcoursSlug]; // SUPPRIMÉ (Redondant et incorrect)
  // const totalEtapes = meta ? meta.etapes : 0; // SUPPRIMÉ (Déjà calculé plus haut)

  const etapePrecedente = etapeCourante > 1 ? etapeCourante - 1 : null;
  // Utilise le 'totalEtapes' calculé au début à partir de getParcoursMeta
  const etapeSuivante = etapeCourante < totalEtapes ? etapeCourante + 1 : null;
  // --- Fin du Calcul Navigation ---

  return (
    <div className="etape-container">
      {/* Affiche le contenu de l'exercice spécifique */}
      <ExerciceComponent />

      {/* --- Navigation Précédent/Suivant --- */}
      {/* Ce bloc utilise maintenant les bonnes variables etapePrecedente, etapeSuivante, totalEtapes */}
      <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center">
        {etapePrecedente ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapePrecedente}`}
            className="px-6 ..."
          >
            &larr; Étape Précédente
          </Link>
        ) : (
          <div aria-hidden="true" className="px-6 py-2 invisible"></div>
        )}
        <span className="text-gray-600 text-sm">
          Étape {etapeCourante} sur {totalEtapes}
        </span>
        {etapeSuivante ? (
          <Link
            href={`/parcours/${parcoursSlug}/${etapeSuivante}`}
            className="px-6 ..."
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
          // Utilisation de la div avec marge pour l'espacement
          <div className="mt-8">
            <ProfessorResourcesExercice1 />
          </div>
        )}
      {/* --- Fin Section Professeur --- */}
    </div>
  );
}

// Générer les pages statiquement lors du build.
export async function generateStaticParams() {
  const paths: { parcoursSlug: string; etapeNumero: string }[] = [];

  // MODIFIÉ: Itère sur l'objet parcoursMetaData importé
  for (const slug in parcoursMetaData) {
    // Utilise getParcoursMeta pour être sûr ou accède directement si la structure est garantie
    const meta = parcoursMetaData[slug]; // Accès direct ici, car on a importé l'objet complet
    if (meta) {
      for (let i = 1; i <= meta.etapes; i++) {
        paths.push({ parcoursSlug: slug, etapeNumero: i.toString() });
      }
    }
  }
  return paths;
}
