const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdoteList = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  const data = await response.json();
  return data;
};

const addAnecdote = async (content) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, votes: 0 }),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  const data = await response.json();
  return data;
};

const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedAnecdote),
  };

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to update anecdote");
  }

  const data = await response.json();
  return data;
};

const deleteAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }
};

export default {
  getAnecdoteList,
  addAnecdote,
  updateAnecdote,
  deleteAnecdote,
};
