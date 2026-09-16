import { useEffect, useState } from "react";
import State from "./State";

function Country() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");


  useEffect(() => {
  fetch("https://location-selector.labs.crio.do/countries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      return response.json();
    })
    .then((data) => setCountries(data))
    .catch((error) => {
      console.error(error);
    });
}, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>

        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <State country={selectedCountry} />
    </div>
  );
}

export default Country;