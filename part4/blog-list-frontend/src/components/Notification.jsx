import { useEffect } from "react";
import "../index.css";
import { useNotification } from "../store/notification";

const Notification = () => {
  const notification = useNotification();
  return (
    notification && (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
