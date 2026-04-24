import { createSlice } from "@reduxjs/toolkit";

let notificationTimer = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload;
    },
    clearNotification(state) {
      state.message = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification =
  (message, durationInSeconds = 5) =>
  (dispatch) => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    dispatch(setNotification(message));

    notificationTimer = window.setTimeout(() => {
      dispatch(clearNotification());
      notificationTimer = null;
    }, durationInSeconds * 1000);
  };

export default notificationSlice.reducer;
