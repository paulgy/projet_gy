"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Données sur l'évolution de la part des indépendants dans la population active
const employmentStatusData = [
  { year: 1982, independent: 18.6, cddInterim: 3.6 },
  { year: 1983, independent: 18.7, cddInterim: 3.4 },
  { year: 1984, independent: 19.1, cddInterim: 3.2 },
  { year: 1985, independent: 18.4, cddInterim: 3.7 },
  { year: 1986, independent: 18.2, cddInterim: 4.2 },
  { year: 1987, independent: 17.9, cddInterim: 4.6 },
  { year: 1988, independent: 17.7, cddInterim: 5.1 },
  { year: 1989, independent: 16.9, cddInterim: 5.5 },
  { year: 1990, independent: 17.1, cddInterim: 5.4 },
  { year: 1991, independent: 16.7, cddInterim: 5.1 },
  { year: 1992, independent: 16.4, cddInterim: 5.5 },
  { year: 1993, independent: 15.4, cddInterim: 6.0 },
  { year: 1994, independent: 15.3, cddInterim: 6.0 },
  { year: 1995, independent: 14.9, cddInterim: 7.1 },
  { year: 1996, independent: 14.4, cddInterim: 7.4 },
  { year: 1997, independent: 14.1, cddInterim: 8.0 },
  { year: 1998, independent: 13.6, cddInterim: 8.5 },
  { year: 1999, independent: 13.4, cddInterim: 8.5 },
  { year: 2000, independent: 12.5, cddInterim: 9.5 },
  { year: 2001, independent: 12.0, cddInterim: 9.1 },
  { year: 2002, independent: 11.9, cddInterim: 8.6 },
  { year: 2003, independent: 11.7, cddInterim: 8.7 },
  { year: 2004, independent: 11.1, cddInterim: 8.7 },
  { year: 2005, independent: 11.1, cddInterim: 9.0 },
  { year: 2006, independent: 11.6, cddInterim: 9.2 },
  { year: 2007, independent: 11.2, cddInterim: 9.2 },
  { year: 2008, independent: 10.7, cddInterim: 9.2 },
  { year: 2009, independent: 11.2, cddInterim: 8.7 },
  { year: 2010, independent: 11.7, cddInterim: 9.4 },
  { year: 2011, independent: 11.8, cddInterim: 9.6 },
  { year: 2012, independent: 11.6, cddInterim: 9.5 },
  { year: 2013, independent: 11.5, cddInterim: 9.3 },
  { year: 2014, independent: 11.7, cddInterim: 9.6 },
  { year: 2015, independent: 11.6, cddInterim: 10.3 },
  { year: 2016, independent: 11.8, cddInterim: 10.5 },
  { year: 2017, independent: 11.7, cddInterim: 11.0 },
  { year: 2018, independent: 11.7, cddInterim: 10.7 },
  { year: 2019, independent: 12.2, cddInterim: 10.2 },
  { year: 2020, independent: 12.5, cddInterim: 9.4 },
  { year: 2021, independent: 12.6, cddInterim: 9.8 },
  { year: 2022, independent: 13.1, cddInterim: 10.3 },
  { year: 2023, independent: 12.9, cddInterim: 9.8 },
];

// Définition des types pour le tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name: string;
    color: string;
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
            {`${entry.name}: ${entry.value.toFixed(1)}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface EmploymentStatusChartProps {
  height?: number;
  showCddInterim?: boolean;
}

const EmploymentStatusChart: React.FC<EmploymentStatusChartProps> = ({ 
  height = 400,
  showCddInterim = true
}) => {
  return (
    <div className="w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart
            data={employmentStatusData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              ticks={[1982, 1990, 2000, 2010, 2020, 2023]}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              domain={[0, 20]}
              tickFormatter={(value) => `${value}%`}
              label={{
                value: "% de la population active",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="independent"
              name="Indépendants"
              stroke="#0062bb"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 7 }}
            />
            {showCddInterim && (
              <Line
                type="monotone"
                dataKey="cddInterim"
                name="CDD et intérimaires"
                stroke="#e63946"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 7 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-left">
        <p>
          Lecture : En 2023, 12,9 % des personnes en emploi ont le statut d'indépendant pour leur emploi principal.
        </p>
        <p>Champ : France hors Mayotte, personnes vivant en logement ordinaire, en emploi.</p>
        <p>Source : Insee, enquête Emploi 2023, séries longues sur le marché du travail.</p>
      </div>
    </div>
  );
};

export default EmploymentStatusChart;
