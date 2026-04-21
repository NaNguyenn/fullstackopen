import { useMemo } from "react";
import { useAnecdoteActions, useAnecdotes } from "../store/anecdotes";
import { useNotificationActions } from "../store/notification";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, delete: deleteAnecdote } = useAnecdoteActions();
  const { show } = useNotificationActions();
  const sortedAnecdotes = useMemo(
    () => anecdotes.toSorted((first, second) => second.votes - first.votes),
    [anecdotes],
  );

  const handleVote = async (anecdote) => {
    await vote(anecdote.id);
    show(`You voted '${anecdote.content}'`);
  };

  const handleDelete = async (anecdote) => {
    await deleteAnecdote(anecdote.id);
    show(`You deleted '${anecdote.content}'`);
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
