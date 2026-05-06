import { useState } from "react";
import { Company } from "../types/types";

export default function useSelectCompany(companies: Company[]) {
  const [selectedId, setSelectedId] = useState(companies[0]?.id || "");
  const selectedCompany = companies.find((it) => it.id === selectedId);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedId(e.target.value);

  return { selectedId, selectedCompany, handleChange };
}
