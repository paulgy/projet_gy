// src/components/exercices/Exercice6Content.tsx
import React from "react";
import VolunteeringExercise from "@/components/VolunteeringExercise";

export default function Exercice6Content() {
  return (
    <div>
      {" "}
      {/* Conteneur optionnel si besoin de styler plus tard */}
      {/* Le titre de cet exercice sera géré par la page de parcours
          ou pourrait être ajouté ici si l'exercice a toujours un titre fixe
          indépendant du parcours. Pour l'instant, on le laisse vide. */}
      <VolunteeringExercise />
    </div>
  );
}
