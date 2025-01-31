import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ onClose, isOpen, onEdit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value || "");
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name, avatar });
  };

  useEffect(() => {
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
    } else {
      setName("");
    }

    if (currentUser && currentUser.avatar) {
      setAvatar(currentUser.avatar);
    } else {
      setAvatar("");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *{" "}
        <input
          id="edit-name"
          name="edit-name"
          value={name}
          type="name"
          className="modal__input"
          placeholder={name}
          required
          minLength="1"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar *{" "}
        <input
          id="edit-avatar"
          name="edit-avatar"
          value={avatar}
          type="url"
          className="modal__input"
          placeholder={avatar}
          required
          minLength="1"
          onChange={handleAvatarChange}
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;