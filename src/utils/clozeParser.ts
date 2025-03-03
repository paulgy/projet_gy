/**
 * Utilitaire pour parser le format de question Cloze de Moodle
 * et le convertir en format utilisable par notre composant QuestionCloze
 */

interface ClozeField {
  id: string;
  answer: number;
  tolerance?: number;
}

interface ParsedCloze {
  text: string;
  fields: ClozeField[];
}

/**
 * Parse un texte au format Moodle Cloze et extrait les champs numériques
 *
 * Format attendu pour les champs numériques: {1:NUMERICAL:=18,6}
 * où:
 * - 1 est l'identifiant du champ
 * - NUMERICAL est le type de champ
 * - =18,6 est la réponse attendue
 */
export function parseClozeText(clozeText: string): ParsedCloze {
  const fields: ClozeField[] = [];

  // Regex pour identifier les champs de type NUMERICAL
  const regex = /\{(\d+):NUMERICAL:=([^~}]+)(?:~=([^}]+))?\}/g;

  // Remplacer chaque match par un placeholder et collecter les données des champs
  let cleanText = clozeText;
  let match;

  while ((match = regex.exec(clozeText)) !== null) {
    const id = match[1];

    // Traiter la possibilité d'avoir plusieurs réponses acceptées (format ~=)
    // Normaliser en remplaçant toutes les virgules par des points
    const primaryAnswer = match[2].replace(/,/g, ".");

    // Si une réponse alternative est présente, l'utiliser pour définir une tolérance
    let tolerance = 0; // Tolérance par défaut
    if (match[3]) {
      // S'il y a une réponse alternative, on définit une tolérance appropriée
      const alternateAnswer = match[3].replace(/,/g, ".");
      const mainValue = parseFloat(primaryAnswer);
      const altValue = parseFloat(alternateAnswer);

      if (!isNaN(mainValue) && !isNaN(altValue)) {
        // La tolérance est la différence absolue entre les deux valeurs
        // plus une marge de 0.05 pour assurer que la réponse alternative est acceptée
        tolerance = Math.abs(mainValue - altValue) + 0.05;
      } else {
        // Si on ne peut pas calculer précisément, on utilise une tolérance standard
        tolerance = 0.1;
      }
    }

    // Créer le champ
    const field: ClozeField = {
      id,
      answer: parseFloat(primaryAnswer),
      tolerance: tolerance,
    };

    fields.push(field);

    // Remplacer le match par un placeholder simple
    cleanText = cleanText.replace(match[0], `{${id}}`);
  }

  return {
    text: cleanText,
    fields,
  };
}
