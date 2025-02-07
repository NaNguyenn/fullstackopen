import "../index.css";

const Notification = ({ notification }) => {
  return (
    notification && (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    )
  );
};

export default Notification;
