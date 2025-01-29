import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileModal, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const avatar = currentUser.avatar || currentUser.name.charAt(0).toUpperCase();
  const username = currentUser.name;

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          className="sidebar__button-edit"
          type="button"
          onClick={handleEditProfileModal}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button-logout"
          type="button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;