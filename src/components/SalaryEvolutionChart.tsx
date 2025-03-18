"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Données formatées du CSV
const salaryData = [
  {
    year: 1996,
    Cadres: 100.0,
    ProfessionsIntermediaires: 100.0,
    Employes: 100.0,
    Ouvriers: 100.0,
    Ensemble: 100.0,
  },
  {
    year: 1997,
    Cadres: 100.5,
    ProfessionsIntermediaires: 100.1,
    Employes: 100.7,
    Ouvriers: 100.9,
    Ensemble: 100.6,
  },
  {
    year: 1998,
    Cadres: 100.9,
    ProfessionsIntermediaires: 100.2,
    Employes: 101.9,
    Ouvriers: 101.4,
    Ensemble: 101.6,
  },
  {
    year: 1999,
    Cadres: 103.4,
    ProfessionsIntermediaires: 100.7,
    Employes: 102.4,
    Ouvriers: 102.4,
    Ensemble: 103.1,
  },
  {
    year: 2000,
    Cadres: 105.2,
    ProfessionsIntermediaires: 100.7,
    Employes: 101.8,
    Ouvriers: 102.6,
    Ensemble: 103.6,
  },
  {
    year: 2001,
    Cadres: 106.1,
    ProfessionsIntermediaires: 100.1,
    Employes: 102.4,
    Ouvriers: 103.4,
    Ensemble: 104.3,
  },
  {
    year: 2002,
    Cadres: 106.3,
    ProfessionsIntermediaires: 100.0,
    Employes: 102.5,
    Ouvriers: 104.1,
    Ensemble: 104.4,
  },
  {
    year: 2003,
    Cadres: 105.6,
    ProfessionsIntermediaires: 100.0,
    Employes: 102.4,
    Ouvriers: 104.6,
    Ensemble: 104.5,
  },
  {
    year: 2004,
    Cadres: 105.1,
    ProfessionsIntermediaires: 99.5,
    Employes: 102.0,
    Ouvriers: 105.1,
    Ensemble: 104.6,
  },
  {
    year: 2005,
    Cadres: 106.1,
    ProfessionsIntermediaires: 100.0,
    Employes: 103.1,
    Ouvriers: 106.3,
    Ensemble: 105.7,
  },
  {
    year: 2006,
    Cadres: 106.4,
    ProfessionsIntermediaires: 100.5,
    Employes: 103.4,
    Ouvriers: 105.8,
    Ensemble: 105.9,
  },
  {
    year: 2007,
    Cadres: 108.7,
    ProfessionsIntermediaires: 101.5,
    Employes: 104.3,
    Ouvriers: 107.3,
    Ensemble: 107.6,
  },
  {
    year: 2008,
    Cadres: 108.0,
    ProfessionsIntermediaires: 101.4,
    Employes: 104.4,
    Ouvriers: 108.6,
    Ensemble: 107.9,
  },
  {
    year: 2009,
    Cadres: 106.3,
    ProfessionsIntermediaires: 101.4,
    Employes: 105.6,
    Ouvriers: 110.9,
    Ensemble: 109.3,
  },
  {
    year: 2010,
    Cadres: 107.6,
    ProfessionsIntermediaires: 101.6,
    Employes: 105.5,
    Ouvriers: 110.7,
    Ensemble: 109.8,
  },
  {
    year: 2011,
    Cadres: 105.8,
    ProfessionsIntermediaires: 101.5,
    Employes: 106.7,
    Ouvriers: 113.5,
    Ensemble: 110.2,
  },
  {
    year: 2012,
    Cadres: 104.8,
    ProfessionsIntermediaires: 100.3,
    Employes: 105.9,
    Ouvriers: 112.8,
    Ensemble: 109.7,
  },
  {
    year: 2013,
    Cadres: 103.5,
    ProfessionsIntermediaires: 99.9,
    Employes: 106.2,
    Ouvriers: 112.6,
    Ensemble: 109.5,
  },
  {
    year: 2014,
    Cadres: 104.0,
    ProfessionsIntermediaires: 100.6,
    Employes: 107.1,
    Ouvriers: 113.1,
    Ensemble: 110.0,
  },
  {
    year: 2015,
    Cadres: 105.1,
    ProfessionsIntermediaires: 101.1,
    Employes: 108.1,
    Ouvriers: 114.4,
    Ensemble: 111.3,
  },
  {
    year: 2016,
    Cadres: 105.4,
    ProfessionsIntermediaires: 101.2,
    Employes: 108.0,
    Ouvriers: 114.6,
    Ensemble: 111.7,
  },
  {
    year: 2017,
    Cadres: 105.6,
    ProfessionsIntermediaires: 102.2,
    Employes: 108.7,
    Ouvriers: 115.1,
    Ensemble: 112.7,
  },
  {
    year: 2018,
    Cadres: 105.4,
    ProfessionsIntermediaires: 101.7,
    Employes: 108.7,
    Ouvriers: 115.3,
    Ensemble: 113.1,
  },
  {
    year: 2019,
    Cadres: 104.6,
    ProfessionsIntermediaires: 103.1,
    Employes: 110.8,
    Ouvriers: 117.7,
    Ensemble: 114.3,
  },
  {
    year: 2020,
    Cadres: 106.6,
    ProfessionsIntermediaires: 104.5,
    Employes: 112.9,
    Ouvriers: 118.5,
    Ensemble: 117.8,
  },
  {
    year: 2021,
    Cadres: 104.7,
    ProfessionsIntermediaires: 103.3,
    Employes: 112.1,
    Ouvriers: 117.4,
    Ensemble: 115.6,
  },
  {
    year: 2022,
    Cadres: 103.4,
    ProfessionsIntermediaires: 102.4,
    Employes: 111.2,
    Ouvriers: 116.2,
    Ensemble: 114.1,
  },
  {
    year: 2023,
    Cadres: 100.5,
    ProfessionsIntermediaires: 101.0,
    Employes: 110.6,
    Ouvriers: 115.9,
    Ensemble: 113.0,
  },
];

// Configuration des couleurs et des noms d'affichage
const lineConfig = [
  { dataKey: "Cadres", color: "#0062bb", name: "Cadres" },
  {
    dataKey: "ProfessionsIntermediaires",
    color: "#e63946",
    name: "Professions intermédiaires",
  },
  { dataKey: "Employes", color: "#2a9d8f", name: "Employés" },
  { dataKey: "Ouvriers", color: "#f4a261", name: "Ouvriers" },
  { dataKey: "Ensemble", color: "#8338ec", name: "Ensemble", strokeWidth: 3 },
];

// Définition des types pour le tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string | number;
}

// Format du tooltip personnalisé
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 shadow-md rounded-md">
        <p className="font-bold">{`Année: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface SalaryEvolutionChartProps {
  height?: number;
}

const SalaryEvolutionChart: React.FC<SalaryEvolutionChartProps> = ({
  height = 400,
}) => {
  // État pour gérer quelles lignes sont visibles
  const [visibleLines, setVisibleLines] = useState<{ [key: string]: boolean }>({
    Cadres: true,
    ProfessionsIntermediaires: true,
    Employes: true,
    Ouvriers: true,
    Ensemble: true,
  });

  // Formater le nom des légendes pour l'affichage
  function formatLegendText(value: string) {
    const config = lineConfig.find((item) => item.dataKey === value);
    return config ? config.name : value;
  }

  return (
    <div className="w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart
            data={salaryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              padding={{ left: 10, right: 10 }}
              ticks={[1996, 2000, 2005, 2010, 2015, 2020, 2023]}
            />
            <YAxis
              domain={[95, 120]}
              label={{
                value: "Indice base 100 en 1996",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={formatLegendText}
              onClick={(e) => {
                if (e && e.dataKey && typeof e.dataKey === "string") {
                  setVisibleLines({
                    ...visibleLines,
                    [e.dataKey]: !visibleLines[e.dataKey],
                  });
                }
              }}
            />
            {lineConfig.map(
              (config) =>
                visibleLines[config.dataKey] && (
                  <Line
                    key={config.dataKey}
                    type="monotone"
                    dataKey={config.dataKey}
                    name={config.name}
                    stroke={config.color}
                    strokeWidth={config.strokeWidth || 2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 7 }}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-left">
        <p>
          Lecture : entre 1996 et 2023, le salaire net moyen en équivalent temps
          plein dans le secteur privé a augmenté de 13,0 % en euros constants.
        </p>
        <p>
          Champ : France hors Mayotte, France métropolitaine jusqu&apos;en 1999,
          salariés du privé, y compris apprentis, stagiaires, bénéficiaires de
          contrats aidés et de contrats de professionnalisation; hors salariés
          agricoles et salariés des particuliers-employeurs.
        </p>
        <p>
          Source : Insee, bases Tous salariés, séries longues sur les salaires.
        </p>
      </div>
    </div>
  );
};

export default SalaryEvolutionChart;
