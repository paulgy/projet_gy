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
import { pibGrowthData } from "@/data/pibData";

// Définition des types pour le tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      year: number;
      pib: number;
      growthRate: number | null;
    };
  }>;
  label?: string | number;
}

// Format du tooltip personnalisé
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 shadow-md rounded-md">
        <p className="font-bold">{`Année: ${label}`}</p>
        <p className="text-blue-600">{`Taux de croissance: ${payload[0].value}%`}</p>
        <p className="text-sm text-gray-600">{`PIB en volume: ${payload[0].payload.pib.toFixed(
          1
        )} milliards €`}</p>{" "}
      </div>
    );
  }
  return null;
};

interface PIBGrowthChartProps {
  height?: number;
}

const PIBGrowthChart: React.FC<PIBGrowthChartProps> = ({ height = 400 }) => {
  // Ne garder que les données avec un taux de croissance (retire la première année)
  const chartData = pibGrowthData.filter((item) => item.growthRate !== null);

  // Trouver les valeurs min et max pour ajuster l'échelle des axes
  const growthRates = chartData.map((item) => item.growthRate as number);
  const minGrowth = Math.floor(Math.min(...growthRates));
  const maxGrowth = Math.ceil(Math.max(...growthRates));

  return (
    <div className="w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              interval="preserveStartEnd"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              domain={[minGrowth - 1, maxGrowth + 1]}
              tickFormatter={(value) => `${value}%`}
              label={{
                value: "Taux de croissance (%)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="growthRate"
              name="Taux de croissance"
              stroke="#0062bb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-left">
        <p>
          Lecture : en 2023, le produit intérieur brut (PIB) augmente de 0,9 %
          en volume.
        </p>
        <p>champ : France.</p>
        <p>Source : INSEE, comptes nationaux - base 2020.</p>
      </div>
    </div>
  );
};

export default PIBGrowthChart;
