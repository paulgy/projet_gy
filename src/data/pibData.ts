// PIB en volume de la France (en milliards d'euros constants)
// Source: INSEE, comptes nationaux, base 2020
export const pibData = [
  { year: 1950, value: 309.143 },
  { year: 1951, value: 326.628 },
  { year: 1952, value: 336.86 },
  { year: 1953, value: 348.197 },
  { year: 1954, value: 368.053 },
  { year: 1955, value: 387.842 },
  { year: 1956, value: 407.421 },
  { year: 1957, value: 430.313 },
  { year: 1958, value: 442.268 },
  { year: 1959, value: 454.517 },
  { year: 1960, value: 490.672 },
  { year: 1961, value: 514.942 },
  { year: 1962, value: 550.248 },
  { year: 1963, value: 583.832 },
  { year: 1964, value: 622.264 },
  { year: 1965, value: 652.374 },
  { year: 1966, value: 686.059 },
  { year: 1967, value: 719.002 },
  { year: 1968, value: 751.674 },
  { year: 1969, value: 804.995 },
  { year: 1970, value: 854.906 },
  { year: 1971, value: 900.16 },
  { year: 1972, value: 940.794 },
  { year: 1973, value: 999.073 },
  { year: 1974, value: 1043.179 },
  { year: 1975, value: 1033.315 },
  { year: 1976, value: 1078.135 },
  { year: 1977, value: 1116.454 },
  { year: 1978, value: 1160.547 },
  { year: 1979, value: 1203.432 },
  { year: 1980, value: 1223.607 },
  { year: 1981, value: 1238.147 },
  { year: 1982, value: 1268.389 },
  { year: 1983, value: 1284.397 },
  { year: 1984, value: 1305.069 },
  { year: 1985, value: 1325.546 },
  { year: 1986, value: 1357.221 },
  { year: 1987, value: 1391.867 },
  { year: 1988, value: 1458.875 },
  { year: 1989, value: 1523.141 },
  { year: 1990, value: 1566.24 },
  { year: 1991, value: 1585.609 },
  { year: 1992, value: 1609.648 },
  { year: 1993, value: 1603.869 },
  { year: 1994, value: 1642.1 },
  { year: 1995, value: 1679.947 },
  { year: 1996, value: 1703.417 },
  { year: 1997, value: 1746.464 },
  { year: 1998, value: 1806.762 },
  { year: 1999, value: 1868.179 },
  { year: 2000, value: 1945.541 },
  { year: 2001, value: 1982.495 },
  { year: 2002, value: 2003.664 },
  { year: 2003, value: 2023.056 },
  { year: 2004, value: 2081.082 },
  { year: 2005, value: 2120.384 },
  { year: 2006, value: 2177.933 },
  { year: 2007, value: 2233.045 },
  { year: 2008, value: 2241.535 },
  { year: 2009, value: 2178.221 },
  { year: 2010, value: 2221.793 },
  { year: 2011, value: 2275.951 },
  { year: 2012, value: 2280.135 },
  { year: 2013, value: 2297.96 },
  { year: 2014, value: 2320.89 },
  { year: 2015, value: 2345.648 },
  { year: 2016, value: 2365.821 },
  { year: 2017, value: 2415.116 },
  { year: 2018, value: 2454.866 },
  { year: 2019, value: 2504.637 },
  { year: 2020, value: 2318.276 },
  { year: 2021, value: 2477.828 },
  { year: 2022, value: 2541.529 },
  { year: 2023, value: 2565.33 },
];

// Fonction pour calculer les taux de croissance annuels
export const calculateGrowthRates = () => {
  return pibData.map((item, index) => {
    // Pour la première année, pas de taux de croissance (année de référence)
    if (index === 0) {
      return {
        year: item.year,
        pib: item.value,
        growthRate: null,
      };
    }

    const previousValue = pibData[index - 1].value;
    const growthRate = ((item.value - previousValue) / previousValue) * 100;

    return {
      year: item.year,
      pib: item.value,
      growthRate: parseFloat(growthRate.toFixed(1)), // Arrondi à 1 décimale
    };
  });
};

// Données avec taux de croissance calculés
export const pibGrowthData = calculateGrowthRates();
