// PIB en volume de la France (en milliards d'euros constants)
// Source: INSEE, comptes nationaux, base 2020
export const pibData = [
  { year: 1950, value: 397.2 },
  { year: 1951, value: 424.6 },
  { year: 1952, value: 441.5 },
  { year: 1953, value: 456.5 },
  { year: 1954, value: 480.9 },
  { year: 1955, value: 508.3 },
  { year: 1956, value: 534.7 },
  { year: 1957, value: 565.5 },
  { year: 1958, value: 582.8 },
  { year: 1959, value: 601.3 },
  { year: 1960, value: 641.0 },
  { year: 1961, value: 675.3 },
  { year: 1962, value: 717.7 },
  { year: 1963, value: 756.7 },
  { year: 1964, value: 807.1 },
  { year: 1965, value: 844.9 },
  { year: 1966, value: 889.8 },
  { year: 1967, value: 926.2 },
  { year: 1968, value: 966.8 },
  { year: 1969, value: 1041.0 },
  { year: 1970, value: 1098.8 },
  { year: 1971, value: 1156.7 },
  { year: 1972, value: 1214.4 },
  { year: 1973, value: 1286.5 },
  { year: 1974, value: 1328.1 },
  { year: 1975, value: 1319.3 },
  { year: 1976, value: 1375.3 },
  { year: 1977, value: 1417.6 },
  { year: 1978, value: 1461.9 },
  { year: 1979, value: 1505.9 },
  { year: 1980, value: 1525.8 },
  { year: 1981, value: 1536.1 },
  { year: 1982, value: 1565.9 },
  { year: 1983, value: 1580.6 },
  { year: 1984, value: 1602.1 },
  { year: 1985, value: 1631.6 },
  { year: 1986, value: 1669.0 },
  { year: 1987, value: 1707.4 },
  { year: 1988, value: 1781.1 },
  { year: 1989, value: 1855.7 },
  { year: 1990, value: 1904.6 },
  { year: 1991, value: 1920.1 },
  { year: 1992, value: 1947.9 },
  { year: 1993, value: 1924.6 },
  { year: 1994, value: 1973.6 },
  { year: 1995, value: 2022.6 },
  { year: 1996, value: 2053.0 },
  { year: 1997, value: 2102.6 },
  { year: 1998, value: 2180.7 },
  { year: 1999, value: 2256.2 },
  { year: 2000, value: 2342.9 },
  { year: 2001, value: 2382.5 },
  { year: 2002, value: 2415.7 },
  { year: 2003, value: 2442.4 },
  { year: 2004, value: 2511.1 },
  { year: 2005, value: 2555.1 },
  { year: 2006, value: 2614.6 },
  { year: 2007, value: 2673.1 },
  { year: 2008, value: 2674.1 },
  { year: 2009, value: 2595.1 },
  { year: 2010, value: 2646.2 },
  { year: 2011, value: 2701.1 },
  { year: 2012, value: 2706.7 },
  { year: 2013, value: 2722.5 },
  { year: 2014, value: 2748.6 },
  { year: 2015, value: 2781.1 },
  { year: 2016, value: 2825.7 },
  { year: 2017, value: 2897.8 },
  { year: 2018, value: 2949.2 },
  { year: 2019, value: 3011.9 },
  { year: 2020, value: 2794.5 },
  { year: 2021, value: 2985.6 },
  { year: 2022, value: 3058.7 },
  { year: 2023, value: 3086.2 },
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
