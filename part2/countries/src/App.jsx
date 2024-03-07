import { useEffect, useMemo } from "react";
import { useState } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    console.log("countries");
    countriesService
      .getAllCountries()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  const handleCountriesFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleSingleCountryShow = (name) => {
    setFilter(name);
  };

  const filteredCountries = useMemo(
    () =>
      filter
        ? countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
        : countries,
    [countries, filter]
  );

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1) {
      const country = filteredCountries[0];
      weatherService
        .getCurrentWeather(
          country.capitalInfo.latlng[0],
          country.capitalInfo.latlng[1]
        )
        .then((currentWeather) => setWeather(currentWeather));
    }
  }, [filteredCountries]);

  return (
    <>
      <span>find countries </span>
      <input type="text" value={filter} onChange={handleCountriesFilter} />

      {filteredCountries &&
        filteredCountries.length > 0 &&
        (filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button
                onClick={() => handleSingleCountryShow(country.name.common)}
              >
                show
              </button>
            </div>
          ))
        ) : (
          <>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>
              <span>capital </span>
              <span>{filteredCountries[0].capital[0]}</span>
            </p>
            <p>
              <span>area </span>
              <span>{filteredCountries[0].area}</span>
            </p>
            <h3>languages:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={filteredCountries[0].flags.png}
              alt={filteredCountries[0].flags.alt}
            />
            {weather && (
              <>
                <h3>Weather in {filteredCountries[0].capital[0]}</h3>
                <div>
                  <span>temperature </span>
                  <span>{weather.main.temp}</span>
                  <span> Celcius</span>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <div>
                  <span>wind </span>
                  <span>{weather.wind.speed}</span>
                  <span> m/s</span>
                </div>
              </>
            )}
          </>
        ))}
    </>
  );
}

export default App;
