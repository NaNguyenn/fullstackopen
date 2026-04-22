import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdote } from "./hooks/useAnecdote";

const App = () => {
  const { anecdoteList, voteAnecdote, anecdoteListError } = useAnecdote();

  if (anecdoteListError) {
    return <div>Error: {anecdoteListError.message}</div>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdoteList?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
