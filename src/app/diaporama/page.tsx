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
          <h1 style={{ fontSize: "60px", color: "#333", marginBottom: "20px" }}>
            TraAM 2024-2025
          </h1>
          <p style={{ fontSize: "24px", color: "#666" }}>
            Appuyez sur la flèche → pour naviguer
          </p>
        </div>
      </Slide>

      {/* Slide de test simple */}
      <Slide className="flex items-center justify-center">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", color: "#333", marginBottom: "20px" }}>
            Slide de Test
          </h2>
          <p style={{ fontSize: "24px", color: "#666" }}>
            Si vous voyez ce texte, la navigation fonctionne !
          </p>
        </div>
      </Slide>
    </Slideshow>
  );
}
