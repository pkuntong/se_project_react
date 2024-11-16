import { useContext } from "react"; 
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";


function ToggleSwitch() {
    const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
      CurrentTemperatureUnitContext
    );
    
return (
    <div className="toggle-switch">
        <label htmlFor="switch__box" className="switch">
            <input 
            id="switch__box"
            type="checkbox" 
            className="switch__box"
            onChange={handleToggleSwitchChange}
            /> 
            <span 
                className={
                    currentTemperatureUnit === "F"
                         ? "switch__slider switch__slider-F"
                         : "switch__slider switch__slider-C"
                }
            />
            <p 
               className={`switch__temp-F ${
                currentTemperatureUnit === 'F' && "switch__active"}`}>F
            </p>
            <p className={`switch__temp-C ${
                currentTemperatureUnit === "C" && "switch__active"}`}>C
            </p>
        </label> 
    </div>
      );
}

export default ToggleSwitch; 