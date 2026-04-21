import { useAnecdoteActions } from "../store/anecdotes";
import { useNotificationActions } from "../store/notification";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { show } = useNotificationActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    await add(content);
    show(`You created '${content}'`);
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
