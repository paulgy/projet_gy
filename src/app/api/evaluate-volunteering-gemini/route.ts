// src/app/api/evaluate-volunteering-gemini/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "Erreur Critique: La clé API Gemini (GEMINI_API_KEY) n'est pas définie dans les variables d'environnement."
  );
}

const InputSchema = z.object({
  answer:
    z.string().min(10, {
      message: "La réponse fournie est trop courte pour une comparaison.",
    }),
});

const VolunteeringEvaluationSchema = z.object({
  evaluation: z.object({
    score:
      z.number()
        .min(0)
        .max(2)
        .int()
        .describe("Score attribué sur 2 points basé sur les critères."),
    feedback_message:
      z.string().describe(
        "Feedback détaillé expliquant le score, les points forts et les points faibles."
      ),
    positive_points:
      z.array(z.string())
        .nullable()
        .optional()
        .describe("Points positifs spécifiques relevés dans la réponse."),
    missing_elements:
      z.array(z.string())
        .nullable()
        .optional()
        .describe(
          "Éléments clés manquants (ex: tendance générale, données spécifiques)."
        ),
    accuracy_issues:
      z.array(z.string())
        .nullable()
        .optional()
        .describe(
          "Erreurs factuelles (ex: mauvaise donnée, mauvaise interprétation de la tendance)."
        ),
    language_issues:
      z.array(z.string())
        .nullable()
        .optional()
        .describe("Problèmes de clarté, de style ou de grammaire."),
  }),
});

export async function POST(request: NextRequest) {
  if (!apiKey) {
    console.error("Tentative d'appel API sans GEMINI_API_KEY configurée.");
    return NextResponse.json(
      {
        error: "Configuration serveur incorrecte : clé API Gemini manquante.",
      },
      { status: 500 }
    );
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error("Erreur de parsing JSON de la requête:", error);
    return NextResponse.json(
      { error: "Requête invalide : impossible de lire le corps JSON." },
      { status: 400 }
    );
  }

  const validationResult = InputSchema.safeParse(requestBody);

  if (!validationResult.success) {
    console.warn(
      "Validation Zod échouée pour la requête:",
      validationResult.error.flatten()
    );
    return NextResponse.json(
      {
        error: "Données invalides fournies.",
        details: validationResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { answer: studentAnswer } = validationResult.data;

  const question =
    "Comparez l’engagement bénévole selon le niveau de diplôme en 2023.";
  const relevantData2023 = {
    "Diplôme supérieur": 29,
    "Bac + 2": 24,
    "Niveau Bac": 22,
    "CAP, BEP": 17,
    "Pas de diplôme, CEP, BEPC": 16,
    Ensemble: 23,
  };
  const dataString = Object.entries(relevantData2023)
    .map(([level, percent]) => `- ${level}: ${percent}%`)
    .join("\n");

  const exampleAnswer = `L’engagement bénévole dans des associations est influencé par le niveau de diplôme. En effet, plus l’individu est diplômé, plus il s’engage comme bénévole dans des associations. Ainsi, tandis que 23 % des personnes interrogées [...] sont bénévoles, 29 % des personnes qui détiennent un diplôme supérieur à bac +2 sont bénévoles contre 16 % des personnes qui n’ont pas ou peu de diplôme (CEP, BEPC) en 2023.`;

  const systemPrompt = `
Rôle : Tu es un professeur d'économie et de sciences sociales évaluant la capacité d'un élève à analyser et comparer des données statistiques issues d'un tableau. Tu dois noter la réponse sur 2 points et fournir un feedback détaillé et constructif.

Tâche : Évaluer la réponse de l'élève à la question suivante, en te basant uniquement sur les données de l'année 2023 fournies ci-dessous.

Question posée à l'élève :
"${question}"

Données pertinentes (Proportion de bénévoles en % pour l'année 2023) :
${dataString}

Critères d'évaluation et de notation (sur 2 points) :

1.  **Compréhension et Pertinence (Focus sur 2023) :**
    * La réponse compare-t-elle bien l'engagement selon le *niveau de diplôme* ?
    * La réponse se concentre-t-elle *exclusivement* sur les données de *2023* ?
    * La réponse identifie-t-elle la *tendance générale* : l'engagement augmente avec le niveau de diplôme ?

2.  **Utilisation des Données Statistiques :**
    * La réponse utilise-t-elle au moins *deux données chiffrées spécifiques et correctes* de 2023 pour illustrer la comparaison ? (ex: citer 29% et 16%).
    * Les données citées sont-elles *exactes* ?

Notation :
* **2 points :** Réponse excellente. La tendance générale est clairement énoncée et illustrée par au moins deux données pertinentes et correctes de 2023.
* **1 point :** Réponse moyenne. La tendance est mentionnée mais peu ou mal illustrée (une seule donnée, erreur mineure), OU des données hors-sujet sont utilisées.
* **0 points :** Réponse insuffisante. Tendance incorrecte ou absente, aucune donnée pertinente de 2023, hors-sujet.

Instructions pour le Feedback :
* Commence par le score (ex: "Score : X/2").
* Mentionne les points forts (ex: "Vous avez correctement identifié la tendance générale...").
* Explique les points faibles en lien avec les critères (ex: "Il manque des données chiffrées pour appuyer votre comparaison.").
* Reste encourageant.

Exemple de bonne réponse de l'élève (pour te guider, ne pas le montrer à l'élève) :
"${exampleAnswer}"

Format de sortie OBLIGATOIRE : Tu DOIS répondre **uniquement** avec un objet JSON valide respectant strictement ce schéma. Ne rajoute AUCUN texte avant ou après le JSON.
{
  "evaluation": {
    "score": 1,
    "feedback_message": "Exemple de feedback.",
    "positive_points": ["Exemple de point positif."],
    "missing_elements": ["Exemple d'élément manquant."],
    "accuracy_issues": null,
    "language_issues": ["Exemple de problème de langue."]
  }
}
`;

  const fullPrompt = `${systemPrompt}
Voici la réponse de l'élève à évaluer : "${studentAnswer}"`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    console.log(
      "Appel à l'API Gemini pour evaluate-volunteering-gemini avec le modèle gemini-pro..."
    );

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const rawResponseContent = response.text();

    console.log("Réponse brute de Gemini reçue:", rawResponseContent);

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

    const validationGemini = VolunteeringEvaluationSchema.safeParse(evaluationData);

    if (!validationGemini.success) {
      console.error(
        "Erreur de validation Zod de la réponse Gemini:",
        validationGemini.error.flatten()
      );
      console.error("Données JSON parsées (avant échec Zod):", evaluationData);
      throw new Error(
        "La structure de la réponse JSON de Gemini est incorrecte ou ne respecte pas le schéma demandé."
      );
    }

    console.log(
      "Évaluation de Gemini validée par Zod:",
      validationGemini.data.evaluation
    );

    return NextResponse.json(validationGemini.data.evaluation);
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API Gemini ou du traitement de sa réponse:",
      error
    );
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur interne est survenue lors de l'évaluation par l'IA.";
    return NextResponse.json(
      {
        error: "Impossible d'évaluer la réponse via l'IA pour le moment.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
