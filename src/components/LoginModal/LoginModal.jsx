import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, onLogIn, isOpen, handleRegisterModal }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    onLogIn({ email: data.email, password: data.password }, resetForm);
  };

  const resetForm = () => {
    setData({ email: "", password: "" });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email *{" "}
        <input
          id="login-email"
          name="login-email"
          value={data.email}
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          minLength="1"
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password *{" "}
        <input
          id="login-password"
          name="login-password"
          value={data.password}
          type="password"
          className="modal__input"
          placeholder="Password"
          required
          minLength="1"
          onChange={handlePasswordChange}
        />
      </label>
      <div className="login__button-container">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          onClick={handleRegisterModal}
          className="modal__alternate-link"
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;