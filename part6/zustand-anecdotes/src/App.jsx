import { useAnecdoteActions, useAnecdotes } from "./store";

const App = () => {
  const anecdotes = useAnecdotes();
  const { vote, add } = useAnecdoteActions();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = e.target.elements.content.value;
          add(content);
          e.target.reset();
        }}
      >
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
