import { useEffect } from "react";
import { useState } from "react";
import countriesService from "./services/countries";

function App() {
  const [search, setSearch] = useState();
  const [contries, setCountries] = useState();

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  const handleCountriesSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <>
      <span>find countries </span>
      <input type="text" value={search} onChange={handleCountriesSearch} />
    </>
  );
}

export default App;
