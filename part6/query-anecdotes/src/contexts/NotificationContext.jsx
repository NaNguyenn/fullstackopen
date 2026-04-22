import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, durationInSeconds = 5) => {
    if (notification?.timeoutId) {
      clearTimeout(notification.timeoutId);
    }
    const timeoutId = setTimeout(() => {
      setNotification(null);
    }, durationInSeconds * 1000);
    setNotification({ message, timeoutId });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
