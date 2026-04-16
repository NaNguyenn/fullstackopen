import { create } from "zustand";

export const useCounterStore = create((set) => ({
  counter: { good: 0, neutral: 0, bad: 0 },
  increment: (type) =>
    set((state) => ({
      counter: { ...state.counter, [type]: state.counter[type] + 1 },
    })),
}));
