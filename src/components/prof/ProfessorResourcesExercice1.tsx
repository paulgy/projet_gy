// src/components/prof/ProfessorResourcesExercice1.tsx
import React from "react";

export default function ProfessorResourcesExercice1() {
  return (
    // Enveloppez le contenu dans une div ou un fragment pour une meilleure structure
    // Ajout d'une marge supérieure et d'une bordure pour séparer visuellement
    <div className="mt-8 pt-6 border-t border-gray-300">
      {/* Section pour les professeurs */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">
          Pour les professeurs
        </h2>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
        {/* ... contenu téléchargements (ul, a href...) ... */}
        <p className="text-gray-700 mb-3">
          <strong> Télécharger :</strong>{" "}
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>la question au format XML à importer directement sur Moodle ;</li>
          <li>
            le code HTML à copier-coller directement dans l&apos;éditeur de
            Moodle
          </li>
        </ul>
        <div className="flex flex-wrap gap-4">
          <a
            href="/files/exercice1-question-cloze.xml"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
            download
          >
            Question Moodle XML
          </a>
          <a
            href="/files/exercice1-question-cloze.html"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors inline-block"
            download
          >
            Code HTML
          </a>
        </div>
      </div>

      {/* Prompts intégrés */}
      <div className="mt-4">
        {/* ... h3 ... */}
        <h3 className="text-lg font-semibold text-indigo-800 mb-3">
          Des exemples de prompts <em>mistral.ai</em> pour générer les contenus
          de l&apos;exercice{" "}
        </h3>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <ol className="list-none pl-0 space-y-3">
            <li>
              <a
                href="https://chat.mistral.ai/chat/e6f0e0df-d13f-44cd-b896-8eb7625f42a0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Prompt pour générer le code HTML du graphique à intégrer dans
                Moodle
              </a>
            </li>

            <li>
              <a
                href="https://chat.mistral.ai/chat/3afe7def-7002-4492-8f18-2d78697ea187"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 hover:text-indigo-900 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Prompt pour générer le texte à compléter au format Question
                Cloze
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
