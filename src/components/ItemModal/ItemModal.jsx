import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onOpenDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser && currentUser?._id === card?.owner;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__caption">
            <p className="modal__caption">{card.name}</p>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={onOpenDelete}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;