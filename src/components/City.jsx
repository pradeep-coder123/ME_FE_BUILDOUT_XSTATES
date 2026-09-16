import { useEffect, useState } from "react";

function City({ country, state }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setCities([]);
    setSelectedCity("");

    if (!country || !state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${encodeURIComponent(
        country
      )}/state=${encodeURIComponent(state)}/cities`
    )
      .then((response) => response.json())
      .then((data) => setCities(data));
  }, [country, state]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!state}
      >
        <option value="">Select City</option>

        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && (
        <p>
          You selected {selectedCity}, {state}, {country}
        </p>
      )}
    </div>
  );
}

export default City;