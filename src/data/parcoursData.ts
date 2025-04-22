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
  // Ajoutez ici les métadonnées pour d'autres futurs parcours
  // 'autre-parcours': { titre: '...', etapes: ... }
};

// Fonction utilitaire pour récupérer les données d'un parcours
export const getParcoursMeta = (slug: string): ParcoursMetaData | undefined => {
  return parcoursMetaData[slug];
};
