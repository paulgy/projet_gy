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
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "30px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Évaluer en SES avec les communs numériques : une approche
            collaborative et interactive pour améliorer les apprentissages.{" "}
          </div>
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
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "30px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            4 objectifs :
          </div>
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

      <Slide className="flex flex-col items-center justify-center">
        <div style={{ padding: "30px", textAlign: "left", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "25px",
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "none",
            }}
          >
            Parcours Grand Oral sur Moodle
          </div>

          <div style={{ display: "flex", gap: "30px" }}>
            {/* Colonne gauche */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "28px",
                  color: "#333",
                  marginBottom: "15px",
                  textTransform: "none",
                }}
              >
                Pourquoi un parcours en ligne ?
              </h2>
              <ul
                style={{
                  fontSize: "22px",
                  lineHeight: "1.4",
                  paddingLeft: "20px",
                }}
              >
                <li>Suivi individuel impossible en classe</li>
                <li>Planification sur l&apos;année entière</li>
                <li>Visibilité sur l&apos;implication des élèves</li>
                <li>Échanges facilités professeur-élève</li>
              </ul>
            </div>

            {/* Colonne droite */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "28px",
                  color: "#333",
                  marginBottom: "15px",
                  textTransform: "none",
                }}
              >
                Structure du parcours
              </h2>
              <ul
                style={{
                  fontSize: "22px",
                  lineHeight: "1.4",
                  paddingLeft: "20px",
                }}
              >
                <li>
                  <strong>6 sections</strong> thématiques
                </li>
                <li>Fiches d&apos;informations et contenus multimédias</li>
                <li>Questionnaires d&apos;autoévaluation</li>
                <li>Remise de travaux et forum d&apos;échanges</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      <Slide className="flex flex-col items-center justify-center">
        <div
          style={{ padding: "30px", textAlign: "center", maxWidth: "900px" }}
        >
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "30px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Les 6 sections du parcours Grand Oral
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {[
              "Présentation",
              "Je fais le point sur ma situation",
              "Je m'informe sur le Grand-Oral",
              "Je travaille la communication verbale et non-verbale",
              "Je formule un sujet pertinent",
              "Je travaille le contenu",
              "Je m'entraîne",
            ].map((section, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  backgroundColor: index % 2 === 0 ? "#f0f7ff" : "#e6f0fd",
                  borderLeft: "6px solid #0062bb",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#0062bb",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: "20px",
                    fontSize: "20px",
                  }}
                >
                  {index}
                </div>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: index === 0 ? "bold" : "normal",
                  }}
                >
                  {section}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide className="flex flex-col items-center justify-center">
        <div
          style={{ padding: "30px", textAlign: "center", maxWidth: "900px" }}
        >
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "35px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Ressources interactives du parcours
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "center",
            }}
          >
            {/* Premier lien */}
            <a
              href="https://ent2d.ac-bordeaux.fr/disciplines/ses/2025/03/15/presentation-de-lepreuve-du-grand-oral/"
              target="_blank"
              style={{
                fontSize: "28px",
                color: "#0062bb",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              Présentation de l&apos;épreuve du Grand Oral
            </a>

            {/* Deuxième lien */}
            <a
              href="https://ent2d.ac-bordeaux.fr/disciplines/ses/2025/03/15/communication-verbale-et-non-verbale/"
              target="_blank"
              style={{
                fontSize: "28px",
                color: "#0062bb",
                textDecoration: "underline",
              }}
            >
              Communication verbale et non-verbale
            </a>
          </div>
        </div>
      </Slide>
      <Slide className="flex flex-col items-center justify-center">
        <div
          style={{ padding: "30px", textAlign: "center", maxWidth: "900px" }}
        >
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "45px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Identification des formes de visualisation de données statistiques
          </div>

          <a
            href="https://www.macroeco.fr/traam/quizz_graph.html"
            target="_blank"
            style={{
              display: "inline-block",
              fontSize: "26px",
              backgroundColor: "#0062bb",
              color: "white",
              padding: "15px 50px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Quiz
          </a>
        </div>
      </Slide>
      <Slide className="flex flex-col items-center justify-center">
        <div
          style={{ padding: "30px", textAlign: "center", maxWidth: "900px" }}
        >
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "45px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Règles essentielles pour l&apos;usage de l&apos;IA en éducation
          </div>

          <a
            href="https://ent2d.ac-bordeaux.fr/disciplines/ses/regles-essentielles-pour-lusage-de-lia-en-education/"
            target="_blank"
            style={{
              display: "inline-block",
              fontSize: "26px",
              color: "#0062bb",
              padding: "15px 30px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              border: "2px solid #0062bb",
              transition: "background-color 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0062bb";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#0062bb";
            }}
          >
            Consulter
          </a>
        </div>
      </Slide>
      <Slide className="flex flex-col items-center justify-center">
        <div
          style={{ padding: "30px", textAlign: "center", maxWidth: "900px" }}
        >
          <div
            style={{
              fontSize: "42px",
              color: "#0062bb",
              marginBottom: "35px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            L&apos;IA au service de l&apos;évaluation en SES
          </div>

          <p
            style={{
              fontSize: "24px",
              color: "#333",
              marginBottom: "40px",
              lineHeight: "1.4",
            }}
          >
            Explorer les potentialités de l&apos;intelligence artificielle pour
            améliorer les pratiques d&apos;évaluation et favoriser la réussite
            des élèves en Sciences Économiques et Sociales.
          </p>

          <a
            href="https://filedn.eu/lOfC7DjLyXz7Y55GpTvy4lB/TraAM/Objectif4_IA_e%CC%81valuation_SES.pdf"
            target="_blank"
            style={{
              display: "inline-block",
              fontSize: "22px",
              backgroundColor: "#0062bb",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            📄 Télécharger le PDF
          </a>
        </div>
      </Slide>
    </Slideshow>
  );
}
