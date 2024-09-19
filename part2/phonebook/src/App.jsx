import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewPersonAdd = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmation = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmation) {
        const newPerson = {
          name: newName,
          number: newPhone,
          id: existingPerson.id,
        };
        personService
          .updatePerson(existingPerson.id, newPerson)
          .then(() => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id ? newPerson : person
              )
            );
            setNotification({ message: `Updated ${newName}`, type: "success" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: error.response.data.error,
              type: "error",
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      } else return;
    } else {
      const newPerson = { name: newName, number: newPhone };
      personService
        .createPerson(newPerson)
        .then((res) => {
          setPersons(persons.concat([{ ...newPerson, id: res.id }]));
          setNotification({ message: `Added ${newName}`, type: "success" });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewPhone("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <Notification notification={notification} />
      <PersonForm
        onChangeName={handleNameChange}
        onChangePhone={handlePhoneChange}
        valueName={newName}
        valuePhone={newPhone}
        onPersonFormSubmit={handleNewPersonAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
