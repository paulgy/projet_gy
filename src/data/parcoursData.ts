// src/data/parcoursData.ts
export interface ParcoursMetaData {
  titre: string;
  etapes: number;
  // Ajoutez d'autres infos si besoin (description, etc.)
}

export interface AllParcoursMetaData {
  [slug: string]: ParcoursMetaData;
}

export const parcoursMetaData: AllParcoursMetaData = {
  "travail-independant-salariat-france": {
    titre: "Le travail indépendant et le salariat en France",
    etapes: 2,
  },
  "lecture-interpretation-donnees-ia": {
    // Ce parcours va maintenant contenir 3 étapes
    titre: "S'entraîner à la question 1 de l'EC2 avec Mistral AI", // Vous pouvez garder ce titre ou l'adapter si besoin
    etapes: 2, // <--- CHANGEMENT ICI : ce parcours a maintenant 2 étapes
  },
  // L'entrée pour 'sentrainer-ec2-mistral' que nous avions envisagée n'est plus nécessaire
};

// Fonction utilitaire pour récupérer les données d'un parcours
export const getParcoursMeta = (slug: string): ParcoursMetaData | undefined => {
  return parcoursMetaData[slug];
};

// Vous pouvez conserver ou ajouter cette fonction pour lister tous les parcours si vous le souhaitez
export const getAllParcours = () => {
  return Object.entries(parcoursMetaData).map(([slug, meta]) => ({
    slug,
    ...meta,
  }));
};
