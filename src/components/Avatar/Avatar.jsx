import avatar from "../../assets/avatar.svg";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import "./Avatar.css";

function Avatar({ className }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (

    <>
      {currentUser?.avatar ? (
        <img

          className={`avatar ${className || ""}`}
          src={currentUser?.avatar || avatar}
          alt={`avatar for ${currentUser?.name}` || "default avatar"}
        />
      ) : (
        <div
          className="avatar avatar__default"
          alt="avatar when image not provided"
        >
          {currentUser?.name[0]}
        </div>
      )}
    </>
  );
}

export default Avatar;