import { useMemo } from "react";
import { useAnecdoteActions, useAnecdotes } from "../store/anecdotes";
import { useNotificationActions } from "../store/notification";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const { show } = useNotificationActions();
  const sortedAnecdotes = useMemo(
    () => anecdotes.toSorted((first, second) => second.votes - first.votes),
    [anecdotes],
  );

  const handleVote = async (anecdote) => {
    await vote(anecdote.id);
    show(`You voted '${anecdote.content}'`);
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
