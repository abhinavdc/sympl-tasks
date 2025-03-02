import { create } from "zustand";

interface CountState {
  count: number;
  increase: (by: number) => void;
}

export const useCounterStore = create<CountState>()((set) => ({
  count: 0,
  increase: (by) => {
    set((state) => ({ count: state.count + by }));
  },
}));
