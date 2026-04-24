import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

export const initializeAnecdotes = createAsyncThunk(
  "anecdotes/initialize",
  async () => anecdotesService.getAll(),
);

export const createAnecdote = createAsyncThunk(
  "anecdotes/create",
  async (content) => anecdotesService.createNew(content),
);

export const voteAnecdote = createAsyncThunk(
  "anecdotes/vote",
  async (id, { getState }) => {
    const anecdote = getState().anecdotes.items.find((item) => item.id === id);
    const updatedAnecdote = await anecdotesService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    return updatedAnecdote;
  },
);

export const deleteAnecdote = createAsyncThunk(
  "anecdotes/delete",
  async (id) => {
    await anecdotesService.delete(id);
    return id;
  },
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: {
    items: [],
    filter: "",
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        state.items = state.items.map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote,
        );
      })
      .addCase(deleteAnecdote.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (anecdote) => anecdote.id !== action.payload,
        );
      });
  },
});

export const { setFilter } = anecdoteSlice.actions;

export const selectFilteredAnecdotes = (state) => {
  const filter = state.anecdotes.filter.trim().toLowerCase();

  return state.anecdotes.items.filter((anecdote) =>
    filter ? anecdote.content.toLowerCase().includes(filter) : true,
  );
};

export default anecdoteSlice.reducer;
