import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, onAddItem, isOpen }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather }, resetForm);
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setWeather("");
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            id="name"
            value={name}
            type="text"
            className="modal__input"
            placeholder="Name"
            required
            minLength="1"
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            id="imageUrl"
            value={imageUrl}
            type="text"
            className="modal__input"
            placeholder="Image URL"
            required
            minLength="1"
            onChange={handleUrlChange}
          />
        </label>
        <fieldset className="modal__radio-buttons" required>
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="hot"
              checked={weather === "hot"}
              onChange={handleWeatherChange}
            />
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="warm"
              checked={weather === "warm"}
              onChange={handleWeatherChange}
            />
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__input_type_radio"
              name="weatherType"
              value="cold"
              checked={weather === "cold"}
              onChange={handleWeatherChange}
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default AddItemModal;