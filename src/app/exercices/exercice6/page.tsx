// Exemple: src/app/exercices/analyse-benevolat/page.tsx
import React from "react";
import VolunteeringExercise from "@/components/VolunteeringExercise"; // Ajuste le chemin si nécessaire
import Link from "next/link"; // Si tu veux ajouter de la navigation

const ExercisePage = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      {/* Optionnel: Ajout d'un en-tête ou navigation */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center mb-4">
          <Link
            href="/"
            className="text-blue-700 hover:text-blue-900 mr-3 font-medium"
          >
            &larr; Retour
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Exercice : Analyse de données statistiques
        </h1>
      </div>

      {/* Intégration du composant Exercice */}
      <VolunteeringExercise />
    </div>
  );
};

export default ExercisePage;
