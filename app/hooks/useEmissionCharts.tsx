import { Company } from "../types/types";
import { EMISSION_FACTORS } from "../utils/emission-factor";

export default function useEmissionCharts(company: Company) {
  if (!company || Object.keys(company).length === 0) return {};

  const getChartData = () => {
    const dataMap = new Map();
    company.emissions.forEach((it) => {
      const yearMonth = it.yearMonth.substring(0, 7);
      const emissionKey = it.source === "원소재" ? it.description : it.source;

      const factor = EMISSION_FACTORS[it.description] || 1;
      const factorCalc = it.emissions * factor;

      if (!dataMap.has(yearMonth)) {
        dataMap.set(yearMonth, { yearMonth });
      }
      const date = dataMap.get(yearMonth);
      date[emissionKey] = +((date[emissionKey] || 0) + factorCalc).toFixed(2);
    });
    return Array.from(dataMap.values()).sort(
      (a, b) =>
        new Date(a.yearMonth).getTime() - new Date(b.yearMonth).getTime(),
    );
  };
  const data = getChartData();

  const barKeys = Array.from(
    new Set(data.flatMap((it) => Object.keys(it))),
  ).filter((key) => key !== "yearMonth");

  return { data, barKeys };
}
