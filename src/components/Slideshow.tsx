"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Composant simple pour représenter une diapositive
export const Slide: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <section className={className}>{children}</section>;
};

// Composant Slideshow simplifié
const Slideshow: React.FC<{
  title?: string;
  children: React.ReactNode;
  backLink?: string;
  backLinkText?: string;
}> = ({
  title,
  children,
  backLink = "/",
  backLinkText = "Retour à l'accueil",
}) => {
  const slideshowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // S'assurer que le code s'exécute uniquement côté client
    if (typeof window === "undefined") return;

    const loadReveal = async () => {
      try {
        console.log("Chargement de Reveal.js...");

        // Chargement de Reveal.js
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const RevealModule = (await import("reveal.js")) as any;
        const Reveal = RevealModule.default;

        // Chargement des styles CSS
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await import("reveal.js/dist/reveal.css" as any);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await import("reveal.js/dist/theme/white.css" as any);
        } catch (e) {
          console.error("Erreur chargement CSS:", e);
        }

        console.log("Initialisation de Reveal.js...");

        // Initialisation avec options minimales
        if (slideshowRef.current) {
          const deck = new Reveal(slideshowRef.current, {
            controls: true,
            progress: true,
            center: true,
            hash: true,
          });

          try {
            await deck.initialize();
            console.log("Reveal.js initialisé avec succès");
          } catch (e) {
            console.error("Erreur d'initialisation:", e);
          }
        }
      } catch (e) {
        console.error("Erreur globale:", e);
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(loadReveal, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* En-tête avec le bouton de retour */}
      <header className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link href={backLink} className="text-blue-600 hover:underline">
            ← {backLinkText}
          </Link>
        </div>
      </header>

      {/* Conteneur Reveal.js avec dimensions explicites */}
      <div
        className="flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="reveal h-full" ref={slideshowRef}>
          <div className="slides h-full">{children}</div>
        </div>
      </div>

      {/* Styles CSS de base pour assurer la visibilité */}
      <style jsx global>{`
        .reveal .slides section {
          font-size: 2rem;
          color: #333;
          display: block !important;
          position: relative !important;
          width: 100%;
          padding: 2rem;
          text-align: center;
          height: auto !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .reveal h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        /* Ces styles seront remplacés par Reveal.js une fois initialisé */
      `}</style>
    </div>
  );
};

// Exportation avec dynamic pour éviter les problèmes SSR
export default dynamic(() => Promise.resolve(Slideshow), { ssr: false });
