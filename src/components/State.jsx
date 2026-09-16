import { useEffect, useState } from "react";
import City from "./City";

function State({ country }) {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    setStates([]);
    setSelectedState("");

    if (!country) return;

        fetch(
      `https://location-selector.labs.crio.do/country=${encodeURIComponent(
        country
      )}/states`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch states");
        }

        return response.json();
      })
      .then((data) => setStates(data))
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div>
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!country}
      >
        <option value="">Select State</option>

        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <City country={country} state={selectedState} />
    </div>
  );
}

export default State;