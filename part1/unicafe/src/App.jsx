import { useState } from "react";

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const StatisticLine = ({ label, value, unit }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
      <td>{unit}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  averageScore,
  positiveRate,
}) => {
  const statisticsShown = good !== 0 || neutral !== 0 || bad !== 0;
  return (
    <div>
      <h1>statistics</h1>
      {statisticsShown ? (
        <table>
          <tbody>
            <StatisticLine label="good" value={good} />
            <StatisticLine label="neutral" value={neutral} />
            <StatisticLine label="bad" value={bad} />
            <StatisticLine label="all" value={total} />
            <StatisticLine label="average" value={averageScore} />
            <StatisticLine label="positive" value={positiveRate} unit="%" />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const averageScore = (good - bad) / total;
  const positiveRate = (good * 100) / total;

  const handleGoodButtonClick = () => setGood(good + 1);
  const handleNeutralButtonClick = () => setNeutral(neutral + 1);
  const handleBadButtonClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={"good"} onClick={handleGoodButtonClick} />
      <Button label={"neutral"} onClick={handleNeutralButtonClick} />
      <Button label={"bad"} onClick={handleBadButtonClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        averageScore={averageScore}
        positiveRate={positiveRate}
      />
    </div>
  );
};

export default App;
