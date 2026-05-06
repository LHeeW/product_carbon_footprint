import { create } from "zustand";

interface PostState {
  updateId: string | null;
  openForm: (id: string) => void;
  closeForm: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  updateId: null,
  openForm: (id) => set({ updateId: id }),
  closeForm: () => set({ updateId: null }),
}));
