import { useEffect, useState } from "react";
import anecdoteService from "../services/anecdotes";

export const useAnecdote = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then((newAnecdote) => {
      setAnecdotes(anecdotes.concat(newAnecdote));
    });
  };

  const deleteAnecdote = (id) => {
    anecdoteService.deleteAnecdote(id).then(() => {
      setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
    });
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
};
