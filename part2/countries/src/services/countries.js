import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAllCountries = () => {
  const req = axios.get(baseUrl + "all");
  return req.then((res) => res.data);
};

const getCountry = (name) => {
  const req = axios.get(baseUrl + "name/" + name);
  return req.then((res) => res.data);
};

export default { getAllCountries, getCountry };
