// projet_gy/src/app/parcours/[parcoursSlug]/[etapeNumero]/page.tsx

import React from "react";
import Link from "next/link";
import Exercice1Content from "@/components/exercices/Exercice1Content";
import Exercice2Content from "@/components/exercices/Exercice2Content";
import ProfessorResourcesExercice1 from "@/components/prof/ProfessorResourcesExercice1";
import { getParcoursMeta, parcoursMetaData } from "@/data/parcoursData";
// Pas besoin de notFound ici si vous gérez l'absence de meta autrement

// --- Application du modèle du projet fonctionnel ---

// Étape 1: Définir la forme des paramètres une fois la Promise résolue
type ResolvedParams = {
  parcoursSlug: string;
  etapeNumero: string;
};

// Étape 2: Définir le type des props de la page avec les Promises (CORRIGÉ)
type Props = {
  // Renommé en Props pour correspondre à votre usage original
  params: Promise<ResolvedParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>; // searchParams est une Promise, optionnelle
};

// Étape 3: Utiliser le type Props et rendre le composant Page ASYNC (CORRIGÉ)
// Note: On ne récupère que 'params' car 'searchParams' n'était pas utilisé (vu lors de l'erreur ESLint)
export default async function EtapePage({ params }: Props) {
  // Utiliser await pour obtenir les valeurs des paramètres résolus (CORRIGÉ)
  const resolvedParams = await params;

  // Extraire les slugs/numeros DEPUIS les params résolus (CORRIGÉ)
  const { parcoursSlug, etapeNumero } = resolvedParams;

  // Le reste de votre code original, qui utilise maintenant les valeurs résolues (INCHANGÉ DANS SA LOGIQUE)
  const etapeCourante = parseInt(etapeNumero, 10);

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

// --- La partie generateStaticParams reste inchangée ---
// Assurez-vous qu'elle est bien présente et correcte comme dans votre code original
type StaticParams = {
  parcoursSlug: string;
  etapeNumero: string;
};

export async function generateStaticParams(): Promise<StaticParams[]> {
  const paths: StaticParams[] = [];
  // ... (votre logique pour peupler paths) ...
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
