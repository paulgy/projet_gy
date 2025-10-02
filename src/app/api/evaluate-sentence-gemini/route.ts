// src/app/api/evaluate-sentence-gemini/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "Erreur: La clé API Gemini (GEMINI_API_KEY) n'est pas définie dans les variables d'environnement."
  );
}

const InputSchema = z.object({
  answer: z.string().min(5, { message: "La phrase fournie est trop courte." }),
});

const GeminiEvaluationSchema = z.object({
  evaluation: z.object({
    is_correct: z.boolean().nullable().optional(),
    feedback_message: z.string(),
    missing_elements: z.array(z.string()).nullable().optional(),
    accuracy_issues: z.array(z.string()).nullable().optional(),
    language_issues: z.array(z.string()).nullable().optional(),
  }),
});

export async function POST(request: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Configuration serveur incorrecte : clé API manquante." },
      { status: 500 }
    );
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error("Erreur de parsing JSON de la requête:", error);
    return NextResponse.json(
      { error: "Requête invalide : impossible de lire le JSON." },
      { status: 400 }
    );
  }

  const validationResult = InputSchema.safeParse(requestBody);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: "Données invalides.",
        details: validationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { answer: studentAnswer } = validationResult.data;

  const context = {
    indicator: "Taux de croissance annuel du PIB réel par habitant en France",
    year: "2020",
    value: -7.8,
  };
  const systemPrompt = `Rôle : Tu es un professeur d'économie rigoureux et formel évaluant la phrase d'un élève qui décrit une donnée statistique. Analyse la phrase fournie par rapport au contexte donné.

Contexte de la donnée à décrire :
- Indicateur : ${context.indicator}
- Année : ${context.year}
- Valeur : ${context.value}%

Instructions pour l'évaluation :
1. Vérifie la présence et l'exactitude des éléments clés : indicateur (ou paraphrase), année, valeur (avec le signe négatif), et sens (baisse, diminution, recul, croissance négative). La mention "France" est implicite.
2. Évalue la clarté, la fluidité et la correction grammaticale de la phrase en français.
3. Rédige un feedback constructif : commence par un point positif si possible, puis explique clairement les erreurs ou omissions, et suggère une formulation correcte si la phrase est erronée. Sois encourageant.
4. Détermine si la phrase est globalement correcte (true) ou non (false) en fonction de la présence et de l'exactitude des informations clés (valeur, année, sens). Tolère des paraphrases de l'indicateur.

Voici quelques exemples pour guider l'évaluation :

---
Exemple 1 :
Phrase de l'élève : "En 2020, le PIB par habitant en France a diminué de 7,8%."
Évaluation attendue :

{
  "evaluation": {
    "is_correct": true,
    "feedback_message": "Excellent ! Votre phrase mentionne correctement l'année (2020), la valeur (-7,8%) et le sens (diminution) de l'indicateur ('PIB par habitant' est une paraphrase acceptable ici). La formulation est claire et précise.",
    "missing_elements": null,
    "accuracy_issues": null,
    "language_issues": null
  }
}
---

---
Exemple 2 :
Phrase de l'élève : "La croissance du PIB par tête était de 7,8% en 2020."
Évaluation attendue :

{
  "evaluation": {
    "is_correct": false,
    "feedback_message": "Vous avez bien identifié l'année (2020) et la valeur numérique (7,8). Cependant, la donnée indique une *baisse* (-7,8%), alors que votre phrase parle de 'croissance' positive. Il est crucial d'indiquer le sens correct (diminution, baisse, recul, ou croissance *négative*). Une formulation correcte serait : 'En France, le PIB réel par habitant a baissé de 7,8% en 2020.'",
    "missing_elements": null,
    "accuracy_issues": ["Sens incorrect (il s'agit d'une baisse, pas d'une croissance positive)", "Signe de la valeur manquant ou incorrect (c'est -7,8%)"],
    "language_issues": null
  }
}
---


Format de sortie OBLIGATOIRE (JSON) : Tu DOIS répondre uniquement avec un objet JSON valide respectant ce schéma :
{
  "evaluation": {
    "is_correct": boolean | null,
    "feedback_message": "string",
    "missing_elements": ["string"] | null,
    "accuracy_issues": ["string"] | null,
    "language_issues": ["string"] | null
  }
}`;
  const userPrompt = `Voici la phrase de l'élève à évaluer : "${studentAnswer}"`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const rawResponseContent = response.text();

    let evaluationData;
    try {
      evaluationData = JSON.parse(rawResponseContent);
    } catch (parseError) {
      console.error(
        "Erreur de parsing JSON de la réponse Gemini:",
        parseError
      );
      throw new Error(
        "La réponse reçue de l'API Gemini n'est pas un JSON valide."
      );
    }

    const validationGemini = GeminiEvaluationSchema.safeParse(evaluationData);
    if (!validationGemini.success) {
      console.error(
        "Erreur de validation Zod de la réponse Gemini:",
        validationGemini.error.flatten()
      );
      throw new Error(
        "La structure de la réponse JSON de Gemini est incorrecte."
      );
    }

    return NextResponse.json(validationGemini.data.evaluation);
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API Gemini ou du traitement:",
      error
    );
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur interne est survenue.";
    return NextResponse.json(
      { error: "Impossible d'évaluer la réponse.", details: errorMessage },
      { status: 500 }
    );
  }
}
