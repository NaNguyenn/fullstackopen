import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const handleDeletePerson = (deletingPerson) => {
    const confirmation = confirm(`Delete ${deletingPerson.name}`);
    if (confirmation) {
      personService.deletePerson(deletingPerson.id).then(() => {
        setPersons(persons.filter((person) => person.id !== deletingPerson.id));
      });
    } else return;
  };

  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          <span>{person.name} </span>
          <span>{person.number}</span>
          <button onClick={() => handleDeletePerson(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
