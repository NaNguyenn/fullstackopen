import { useState } from "react";

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const Statistic = ({ label, value }) => {
  return (
    <div>
      <span>{label} </span>
      <span>{value}</span>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButtonClick = () => setGood(good + 1);
  const handleNeutralButtonClick = () => setNeutral(neutral + 1);
  const handleBadButtonClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={"good"} onClick={handleGoodButtonClick} />
      <Button label={"neutral"} onClick={handleNeutralButtonClick} />
      <Button label={"bad"} onClick={handleBadButtonClick} />
      <h1>statistics</h1>
      <Statistic label="good" value={good} />
      <Statistic label="neutral" value={neutral} />
      <Statistic label="bad" value={bad} />
    </div>
  );
};

export default App;
