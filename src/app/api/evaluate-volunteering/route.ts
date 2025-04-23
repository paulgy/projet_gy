// src/app/api/evaluate-volunteering/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai"; // Correction: Utiliser l'import nommé
import { z } from "zod";

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.error(
    "Erreur Critique: La clé API Mistral (MISTRAL_API_KEY) n'est pas définie dans les variables d'environnement."
  );
}

const InputSchema = z.object({
  answer: z
    .string()
    .min(10, {
      message: "La réponse fournie est trop courte pour une comparaison.",
    }),
});

const VolunteeringEvaluationSchema = z.object({
  evaluation: z.object({
    score: z
      .number()
      .min(0)
      .max(2)
      .int()
      .describe("Score attribué sur 2 points basé sur les critères."),
    feedback_message: z
      .string()
      .describe(
        "Feedback détaillé expliquant le score, les points forts et les points faibles."
      ),
    positive_points: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("Points positifs spécifiques relevés dans la réponse."),
    missing_elements: z
      .array(z.string())
      .nullable()
      .optional()
      .describe(
        "Éléments clés manquants (ex: tendance générale, données spécifiques)."
      ),
    accuracy_issues: z
      .array(z.string())
      .nullable()
      .optional()
      .describe(
        "Erreurs factuelles (ex: mauvaise donnée, mauvaise interprétation de la tendance)."
      ),
    language_issues: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("Problèmes de clarté, de style ou de grammaire."),
  }),
});

export async function POST(request: NextRequest) {
  if (!apiKey) {
    console.error("Tentative d'appel API sans MISTRAL_API_KEY configurée.");
    return NextResponse.json(
      {
        error: "Configuration serveur incorrecte : clé API Mistral manquante.",
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

  // --- Prompt Système pour Mistral AI ---
  const systemPrompt = `
Rôle : Tu es un professeur d'économie et de sciences sociales évaluant la capacité d'un élève à analyser et comparer des données statistiques issues d'un tableau. Tu dois noter la réponse sur 2 points et fournir un feedback détaillé et constructif.

Tâche : Évaluer la réponse de l'élève à la question suivante, en te basant uniquement sur les données de l'année 2023 fournies ci-dessous.

Question posée à l'élève :
"${question}"

Données pertinentes (Proportion de bénévoles en % pour l'année 2023) :
${dataString}

Critères d'évaluation et de notation (sur 2 points) :

1.  **Compréhension et Pertinence (Focus sur 2023) :** (Coefficient 1)
    * La réponse compare-t-elle bien l'engagement selon le *niveau de diplôme* ?
    * La réponse se concentre-t-elle *exclusivement* sur les données de *2023* ? (Toute mention ou comparaison avec 2019/2022 est hors-sujet pour cette question précise).
    * La réponse identifie-t-elle la *tendance générale* : l'engagement augmente avec le niveau de diplôme ?

2.  **Utilisation des Données Statistiques :** (Coefficient 1)
    * La réponse utilise-t-elle au moins *deux données chiffrées spécifiques et correctes* de 2023 pour illustrer la comparaison ? (ex: citer 29% et 16%).
    * Les données citées sont-elles *exactes* et correctement interprétées ?
    * Alternativement, l'élève utilise-t-il un *calcul pertinent* basé sur les données (ex: différence, ratio) pour comparer ?

Notation :
* **2 points :** Réponse excellente. La tendance générale est clairement énoncée et illustrée par au moins deux données pertinentes et correctes de 2023 (ou un calcul juste). La réponse est focalisée sur 2023 et bien rédigée.
* **1 point :** Réponse moyenne. La tendance est mentionnée mais peu ou mal illustrée (une seule donnée, erreur mineure dans une donnée, pas de donnée chiffrée), OU la tendance est correcte mais la réponse inclut des données hors-sujet (autres années), OU la réponse utilise des données correctes mais n'explicite pas clairement la tendance.
* **0 points :** Réponse insuffisante. La tendance est incorrecte ou absente, aucune donnée pertinente/correcte de 2023 n'est utilisée, la réponse est hors-sujet (ne compare pas selon le diplôme, se base sur les mauvaises années) ou très confuse.

Instructions pour le Feedback :
* Commence par indiquer le score obtenu (ex: "Score : 1/2").
* Sois spécifique : mentionne les points forts (ex: "Vous avez correctement identifié la tendance générale...") et les points faibles en lien direct avec les critères (ex: "Il manque des données chiffrées pour appuyer votre comparaison", "Attention à ne mentionner que les données de 2023 comme demandé").
* Si la réponse est proche de la perfection mais manque un petit élément, suggère une amélioration.
* Si la réponse est incorrecte, explique clairement pourquoi et rappelle la méthode attendue (identifier tendance + illustrer avec chiffres 2023).
* Reste encourageant.

Exemple de bonne réponse de l'élève (pour te guider, ne pas le montrer à l'élève) :
"${exampleAnswer}"

Format de sortie OBLIGATOIRE : Tu DOIS répondre **uniquement** avec un objet JSON valide respectant strictement ce schéma. Ne rajoute AUCUN texte avant ou après le JSON.
\`\`\`json
{
  "evaluation": {
    "score": integer, // 0, 1 ou 2
    "feedback_message": "string", // Ton feedback détaillé
    "positive_points": ["string"] | null, // Points forts spécifiques
    "missing_elements": ["string"] | null, // Ce qui manque
    "accuracy_issues": ["string"] | null, // Erreurs factuelles
    "language_issues": ["string"] | null // Problèmes de forme
  }
}
\`\`\`
`;
  // --- Fin du Prompt Système ---

  const userPrompt = `Voici la réponse de l'élève à évaluer : "${studentAnswer}"`;

  try {
    const client = new Mistral({ apiKey: apiKey });

    console.log("Appel à l'API Mistral avec le modèle mistral-large-latest...");

    // *** LA CORRECTION EST ICI ***
    const chatResponse = await client.chat.complete({
      // Utiliser .complete
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      responseFormat: { type: "json_object" },
    });
    // *** FIN DE LA CORRECTION ***

    const rawResponseContent = chatResponse.choices?.[0]?.message?.content;

    if (!rawResponseContent || typeof rawResponseContent !== "string") {
      console.error(
        "Réponse invalide ou vide reçue de Mistral:",
        rawResponseContent
      );
      throw new Error(
        "La réponse reçue de l'API Mistral n'est pas une chaîne de caractères valide."
      );
    }

    console.log("Réponse brute de Mistral reçue:", rawResponseContent);

    let evaluationData;
    try {
      evaluationData = JSON.parse(rawResponseContent);
    } catch (parseError) {
      console.error(
        "Erreur de parsing JSON de la réponse Mistral:",
        parseError
      );
      console.error(
        "Réponse brute qui a échoué au parsing:",
        rawResponseContent
      );
      if (
        rawResponseContent.includes("{") &&
        rawResponseContent.includes("}")
      ) {
        const potentialJson = rawResponseContent.substring(
          rawResponseContent.indexOf("{"),
          rawResponseContent.lastIndexOf("}") + 1
        );
        try {
          evaluationData = JSON.parse(potentialJson);
          console.warn("Parsing réussi après extraction manuelle du JSON.");
        } catch (innerError) {
          console.error("Erreur lors de l'extraction manuelle:", innerError);
          console.error("Tentative d'extraction manuelle du JSON échouée.");
          throw new Error(
            "La réponse de l'API Mistral n'est pas un JSON valide, même après tentative d'extraction."
          );
        }
      } else {
        throw new Error(
          "La réponse de l'API Mistral n'est pas un JSON valide."
        );
      }
    }

    const validationMistral =
      VolunteeringEvaluationSchema.safeParse(evaluationData);

    if (!validationMistral.success) {
      console.error(
        "Erreur de validation Zod de la réponse Mistral:",
        validationMistral.error.flatten()
      );
      console.error("Données JSON parsées (avant échec Zod):", evaluationData);
      throw new Error(
        "La structure de la réponse JSON de Mistral est incorrecte ou ne respecte pas le schéma demandé."
      );
    }

    console.log(
      "Évaluation validée par Zod:",
      validationMistral.data.evaluation
    );

    return NextResponse.json(validationMistral.data.evaluation);
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API Mistral ou du traitement:",
      error
    );
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur interne est survenue lors de l'évaluation.";
    return NextResponse.json(
      {
        error: "Impossible d'évaluer la réponse pour le moment.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
