const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          <span>{person.name} </span>
          <span>{person.phone}</span>
        </p>
      ))}
    </>
  );
};

export default Persons;
