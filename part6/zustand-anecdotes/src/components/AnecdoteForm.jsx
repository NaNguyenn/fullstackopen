import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    await dispatch(createAnecdote(content));
    dispatch(showNotification(`You created '${content}'`));
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
