import { create } from "zustand";
import anecdotesService from "../services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: null,
  actions: {
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll();
      set(() => ({ anecdotes }));
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = await anecdotesService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }));
    },
    add: async (content) => {
      const newAnecdote = await anecdotesService.createNew(content);
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
    },
    delete: async (id) => {
      await anecdotesService.delete(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter((anecdote) =>
    filter
      ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
      : true,
  );
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
