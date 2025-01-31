import "./ModalWithConfirm.css";

function ModalWithConfirm({ activeModal, onClose, onDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "confirm" && "modal_opened"}`}>
      <div className="modal__content modal__confirm">
        <button onClick={onClose} type="button" className="modal__close" />
        <div className="modal__confirm-texts">
          <p className="modal__confirm-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirm-text">This action is irreversible.</p>
        </div>
        <div className="modal__confirm-btns">
          <button
            type="button"
            className="modal__confirm-btn"
            onClick={onDeleteItem}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__confirm-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWithConfirm;