// src/components/exercices/Exercice2Ec2GeminiContent.tsx
import React from "react";
import GeminiEc2Exercise from "@/components/GeminiEc2Exercise";

export default function Exercice2Ec2GeminiContent() {
  return (
    <div>
      {/*
        Le titre général de l'exercice (par exemple, "S'entraîner à la question 1 de l'EC2 avec Gemini AI")
        sera typiquement géré par la page de parcours elle-même (`[etapeNumero]/page.tsx`).
        Le composant GeminiEc2Exercise contient déjà son propre titre pour le tableau de données
        ("Indicateurs économiques en Zone Euro - Mai 2023") et la question.
        Si vous avez besoin d'un titre supplémentaire spécifique à CE conteneur, vous pouvez l'ajouter ici,
        mais ce n'est probablement pas nécessaire.
      */}
      <GeminiEc2Exercise />
    </div>
  );
}