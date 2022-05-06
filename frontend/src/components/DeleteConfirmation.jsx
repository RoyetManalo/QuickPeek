function DeleteConfirmation({ onCloseConfirm, onDelete }) {
  return (
    <div className="modal pt-7">
      <div className="modal-content confirm-modal">
        <h3>Are you sure you want to delete?</h3>
        <div className="confirm-btns">
          <button className="btn red" onClick={onDelete}>
            Yes
          </button>
          <button className="btn" onClick={onCloseConfirm}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
