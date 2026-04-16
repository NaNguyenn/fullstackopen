import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  return (
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
  );
};

export default AnecdoteForm;
