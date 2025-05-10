// src/app/api/evaluate-ec2-mistral/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";
import { z } from "zod";

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.error(
    "Erreur Critique: La clé API Mistral (MISTRAL_API_KEY) n'est pas définie dans les variables d'environnement."
  );
  // Il serait bon de throw une erreur ici ou de gérer cela plus formellement
  // pour empêcher l'application de continuer si la clé est manquante au démarrage.
}

const InputSchema = z.object({
  answer: z.string().min(10, {
    message: "La réponse fournie est trop courte pour une comparaison.",
  }),
});

const EvaluationOutputSchema = z.object({
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
        "Éléments clés manquants (ex: données spécifiques, comparaison sur un des aspects)."
      ),
    accuracy_issues: z
      .array(z.string())
      .nullable()
      .optional()
      .describe(
        "Erreurs factuelles (ex: mauvaise donnée, mauvaise interprétation)."
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
    "À l’aide du document, comparez les conjonctures économiques de l’Espagne et de la Lettonie. (2 points)";

  const espagneData = { pays: "Espagne", inflation: "2,9%", chomage: "12,7%" };
  const lettonieData = {
    pays: "Lettonie",
    inflation: "12,3%",
    chomage: "5,7%",
  };

  const dataString = `
    - Espagne : Taux d’inflation ${espagneData.inflation}, Taux de chômage ${espagneData.chomage}
    - Lettonie : Taux d’inflation ${lettonieData.inflation}, Taux de chômage ${lettonieData.chomage}
  `; // Backtick de fermeture pour dataString

  const exampleAnswer = `Le taux d’inflation et le taux de chômage sont deux des indicateurs qui permettent de caractériser la conjoncture d’une économie nationale. Ainsi nous pouvons voir qu’en Espagne, en mai 2023, le taux d’inflation était de ${espagneData.inflation} alors qu’il était de ${lettonieData.inflation} en Lettonie. Cependant, le taux de chômage était de ${espagneData.chomage} en Espagne en mai 2023 alors qu’il n’était que de ${lettonieData.chomage} en Lettonie. Ces deux pays membres de l’Union européenne ont donc des conjonctures économiques différentes au printemps 2023.`; // Backtick de fermeture pour exampleAnswer

  // --- Prompt Système pour Mistral AI ---
  // Le template literal pour systemPrompt commence ICI
  const systemPrompt = `
Rôle : Tu es un professeur d'économie et de sciences sociales évaluant la réponse d'un élève à une question de comparaison de conjonctures économiques entre deux pays, basée sur des données statistiques fournies (taux d'inflation et taux de chômage). Tu dois noter la réponse sur 2 points et fournir un feedback constructif.

Tâche : Évaluer la réponse de l'élève à la question suivante, en te basant EXCLUSIVEMENT sur les données fournies pour l'Espagne et la Lettonie.

Question posée à l'élève :
"${question}"

Données économiques pertinentes (Mai 2023) :
${dataString}

Critères d'évaluation et de notation (sur 2 points au total) :

1.  **Respect de la consigne et sélection des données (implicite dans la comparaison) :**
    * La réponse se concentre-t-elle sur la comparaison de l'Espagne ET de la Lettonie ?
    * Les QUATRE données chiffrées (inflation Espagne, chômage Espagne, inflation Lettonie, chômage Lettonie) sont-elles correctement lues et utilisées pour la comparaison ?

2.  **Qualité de la comparaison :**
    * La comparaison met-elle en évidence les différences (ou similitudes) pour le taux d'inflation ENTRE les deux pays ?
    * La comparaison met-elle en évidence les différences (ou similitudes) pour le taux de chômage ENTRE les deux pays ?
    * La réponse conclut-elle sur la nature des conjonctures (similaires, différentes, contrastées) ?

Barème de notation :

* **2 points (Très bonne réponse) :**
    * Les 4 données chiffrées sont correctement lues et utilisées.
    * La comparaison est explicite pour l'inflation ET pour le chômage entre les deux pays.
    * La conclusion sur les conjonctures est pertinente.
    * La réponse est claire et bien organisée.
    * Exemple: L'élève identifie que l'Espagne a une inflation plus faible mais un chômage plus élevé que la Lettonie, et que la Lettonie a une inflation plus forte mais un chômage plus faible, menant à des conjonctures différentes.

* **1 point (Réponse moyenne) :**
    * Au moins 2 ou 3 données chiffrées sont correctement utilisées.
    * La comparaison est partiellement réussie (ex: compare bien l'inflation mais oublie le chômage, ou se trompe sur une donnée, ou compare seulement pour un pays).
    * OU la comparaison est faite pour les deux indicateurs mais une ou deux données sont erronées.
    * OU la conclusion est absente ou peu claire.
    * Exemple: L'élève mentionne correctement 3 chiffres mais en oublie un, ou compare l'inflation mais pas le chômage.

* **0 points (Réponse insuffisante) :**
    * Moins de 2 données chiffrées sont correctement utilisées.
    * Absence de comparaison claire entre les deux pays pour les deux indicateurs.
    * Nombreuses erreurs dans la lecture des données.
    * Réponse hors-sujet (ne compare pas l'Espagne et la Lettonie, ou utilise d'autres données que celles fournies).

Instructions pour le Feedback :
* Commence par indiquer le score obtenu (ex: "Score : X/2").
* Identifie clairement les points positifs (ex: "Vous avez correctement comparé les taux d'inflation.", "Les données pour l'Espagne sont exactes.").
* Souligne les éléments manquants ou les erreurs (ex: "Il manque la comparaison des taux de chômage.", "Attention, le taux d'inflation de la Lettonie est de 12,3%, pas X%.", "Pensez à bien utiliser les quatre chiffres fournis pour étayer votre comparaison.").
* Si des données sont omises, précisez lesquelles.
* Soyez précis sur ce qui est attendu pour atteindre un meilleur score, en lien avec les critères.
* Restez encourageant et constructif. Ne pas faire de calculs de comparaison (ratios, écarts) si l'élève ne le fait pas, se concentrer sur la lecture et la mise en relation des données.

Exemple de bonne réponse de l'élève (NE PAS MONTRER CET EXEMPLE À L'ÉLÈVE, c'est pour ton guidage interne) :
"${exampleAnswer}"

Format de sortie OBLIGATOIRE : Tu DOIS répondre **uniquement** avec un objet JSON valide respectant strictement ce schéma. Ne rajoute AUCUN texte avant ou après le JSON.
\`\`\`json
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
\`\`\`
`; // ATTENTION : Ce backtick (`) termine la longue chaîne systemPrompt. Il DOIT être présent.
  // --- Fin du Prompt Système ---

  const userPrompt = `Voici la réponse de l'élève à évaluer : "${studentAnswer}"`; // Backtick de fermeture pour userPrompt

  try {
    const client = new Mistral({ apiKey: apiKey });

    console.log(
      "Appel à l'API Mistral pour evaluate-ec2-mistral avec le modèle mistral-large-latest..."
    );

    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      responseFormat: { type: "json_object" },
    });

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
          console.warn(
            "Parsing réussi après extraction manuelle du JSON de la réponse de Mistral."
          );
        } catch (innerError) {
          console.error(
            "Erreur lors de la tentative d'extraction manuelle du JSON:",
            innerError
          );
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

    const validationMistral = EvaluationOutputSchema.safeParse(evaluationData);

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
      "Évaluation de Mistral validée par Zod:",
      validationMistral.data.evaluation
    );

    return NextResponse.json(validationMistral.data.evaluation);
  } catch (error) {
    console.error(
      "Erreur lors de l'appel à l'API Mistral ou du traitement de sa réponse:",
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
