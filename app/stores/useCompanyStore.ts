import { create } from "zustand";

interface CompanyState {
  selectedId: string;
  setSelectedId: (id: string) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedId: "",
  setSelectedId: (id) => set({ selectedId: id }),
}));
