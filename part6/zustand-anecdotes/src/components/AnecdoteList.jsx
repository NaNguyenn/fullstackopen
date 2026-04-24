import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnecdote,
  selectFilteredAnecdotes,
  voteAnecdote,
} from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAnecdotes);
  const sortedAnecdotes = useMemo(
    () => anecdotes.toSorted((first, second) => second.votes - first.votes),
    [anecdotes],
  );

  const handleVote = async (anecdote) => {
    await dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted '${anecdote.content}'`));
  };

  const handleDelete = async (anecdote) => {
    await dispatch(deleteAnecdote(anecdote.id));
    dispatch(showNotification(`You deleted '${anecdote.content}'`));
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
