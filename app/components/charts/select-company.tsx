"use client";

import EmissionCharts from "./emission-charts";
import { useCompanyStore } from "@/app/stores/useCompanyStore";
import { useCompaniesQuery } from "@/app/hooks/tanstacks/query/useCompanyQuery";

export default function SelectCompany() {
  const { selectedId, setSelectedId } = useCompanyStore();
  const { data: companies } = useCompaniesQuery();

  if (companies.length === 0) return <div>데이터가 없습니다.</div>;
  return (
    <>
      <select
        id="company"
        name="company"
        autoComplete="off"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name} - {company.country}
          </option>
        ))}
      </select>
      <EmissionCharts />
    </>
  );
}
