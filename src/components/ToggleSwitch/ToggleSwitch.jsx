import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="toggle__input" className="toggle">
      <input
        id="toggle__input"
        type="checkbox"
        className="toggle__input"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggle__slider toggle__slider-F"
            : "toggle__slider toggle__slider-C"
        }
      />
      <p
        className={`toggle__temp-F ${
          currentTemperatureUnit === "F" && "toggle__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle__temp-C ${
          currentTemperatureUnit === "C" && "toggle__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;