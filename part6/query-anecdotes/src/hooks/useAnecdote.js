import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../services/anecdotes";
import useNotification from "./useNotification";

export const useAnecdote = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const result = useQuery({
    queryKey: ["anecdote-list"],
    queryFn: anecdoteService.getAnecdoteList,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdote-list"]);
      queryClient.setQueryData(
        ["anecdote-list"],
        anecdotes.concat(newAnecdote),
      );
      showNotification(`Anecdote "${newAnecdote.content}" created!`);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdote-list"]);
      queryClient.setQueryData(
        ["anecdote-list"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        ),
      );
      showNotification(`Anecdote "${updatedAnecdote.content}" updated!`);
    },
  });

  return {
    anecdoteList: result.data,
    anecdoteListError: result.error,
    isLoadingAnecdoteList: result.isPending,
    addAnecdote: (content) => newAnecdoteMutation.mutate(content),
    voteAnecdote: (anecdote) =>
      updateAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  };
};
