import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, onAddItem, isOpen }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="New garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          id="name"
          name="name"
          value={values.name}
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          id="imageUrl"
          name="imageUrl"
          value={values.imageUrl}
          type="text"
          className="modal__input"
          placeholder="Image URL"
          required
          minLength="1"
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons" required>
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__input_type_radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__input_type_radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__input_type_radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
      <button type="submit" className="modal__submit">
        Add garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;