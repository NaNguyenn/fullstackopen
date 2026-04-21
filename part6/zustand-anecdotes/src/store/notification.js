import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  message: null,
  timer: null,
  actions: {
    show: (message, durationInSeconds = 5) => {
      const existingTimer = get().timer;

      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = window.setTimeout(() => {
        set(() => ({ message: null, timer: null }));
      }, durationInSeconds * 1000);

      set(() => ({ message, timer }));
    },
  },
}));

export const useNotification = () => {
  const message = useNotificationStore((state) => state.message);
  return message;
};
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
