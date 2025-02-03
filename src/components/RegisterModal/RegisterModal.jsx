import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, handleLogInModal, onRegister, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(
      {
        email,
        password,
        name,
        avatar,
      },
      resetForm
    );
  };

  const resetForm = () => {
    setEmail(""), setPassword(""), setName(""), setAvatar("");
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email *
        <input
          name="email"
          value={email}
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          minLength="1"
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password *
        <input
          name="password"
          value={password}
          type="password"
          className="modal__input"
          placeholder="Password"
          required
          minLength="1"
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Name *
        <input
          name="name"
          value={name}
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL *
        <input
          name="avatar"
          value={avatar}
          type="text"
          className="modal__input"
          placeholder="Avatar URL"
          required
          minLength="1"
          onChange={handleAvatarChange}
        />
      </label>
      <div className="register__button-container">
        <button className="modal__submit">Sign up</button>
        <button
          type="button"
          onClick={handleLogInModal}
          className="modal__alternate-link"
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;