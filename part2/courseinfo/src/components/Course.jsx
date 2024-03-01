const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};
const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (total, currentPart) => total + currentPart.exercises,
    0
  );
  return <b>{`total of ${totalExercises} exercises`}</b>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
