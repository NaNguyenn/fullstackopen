import { useEffect } from "react";
import "../index.css";

const Notification = ({ notification, handleUpdateNotification }) => {
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        handleUpdateNotification(null);
      }, 3000);
    }
  }, [handleUpdateNotification, notification]);

  return (
    notification && (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
