"use client";

import dynamic from "next/dynamic";
import { Slide } from "@/components/Slideshow";

// Importer le composant Slideshow avec dynamic
const Slideshow = dynamic(() => import("@/components/Slideshow"), {
  ssr: false,
  loading: () => <p className="p-4">Chargement du diaporama...</p>,
});

export default function DiaporamaPage() {
  return (
    <Slideshow
      title="TraAM 2024-2025"
      backLink="/"
      backLinkText="Retour aux exercices"
    >
      {/* Un seul slide avec style forcé pour garantir la visibilité */}
      <Slide className="flex items-center justify-center">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h3 style={{ textTransform: "none" }}>
            Évaluer en SES avec les communs numériques : une approche
            collaborative et interactive pour améliorer les apprentissages.{" "}
          </h3>
          <p style={{ fontSize: "24px", color: "#666" }}>Bordeaux - Limoges</p>
        </div>
      </Slide>

      {/* Slide de test simple */}
      <Slide className="flex items-center justify-center">
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              color: "#333",
              marginBottom: "20px",
              textTransform: "none",
            }}
          >
            4 objectifs :
          </h2>
          <ol>
            <li>
              Développer les pratiques collaboratives avec les communs
              numériques
            </li>
            <li>
              Créer des parcours interactifs pour améliorer et différencier les
              apprentissages.
            </li>
            <li>
              Développer les compétences numériques en termes de traitement des
              données statistiques.
            </li>
            <li>
              Explorer les potentialités de l&apos;intelligence artificielle
              pour améliorer l&apos;évaluation en SES
            </li>
          </ol>
        </div>
      </Slide>
    </Slideshow>
  );
}
