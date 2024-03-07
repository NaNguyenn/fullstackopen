import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getCurrentWeather = (latitude, longitude) => {
  const req = axios.get(
    baseUrl +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=" +
      apiKey
  );
  return req.then((res) => res.data);
};

export default { getCurrentWeather };
