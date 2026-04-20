import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    add(content);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
