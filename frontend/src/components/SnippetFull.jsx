import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeFullSnippet,
  openEditSnippet,
} from "../features/modals/modalSlice";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { deleteSnippet } from "../features/snippets/snippetSlice";
import DeleteConfirmation from "./DeleteConfirmation";
import EditSnippetForm from "./EditSnippetForm";

function SnippetFull({ snippet, isProfile, mySnippets }) {
  console.log(snippet);
  const dispatch = useDispatch();

  const [copied, setOnCopied] = useState(false);
  const [onDeleteConfirm, setOnDeleteConfirm] = useState(false);

  const { editSnippetModal } = useSelector((state) => state.modal);

  const onCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    // create notif after code is copy
    setOnCopied(true);

    setTimeout(() => {
      setOnCopied(false);
    }, 3000);
  };
  const onShowDeleteConfirm = () => {
    setOnDeleteConfirm(true);
  };

  const onCloseConfirm = () => {
    setOnDeleteConfirm(false);
  };

  const onDelete = (id) => {
    dispatch(deleteSnippet(id));
    setOnDeleteConfirm(false);
    dispatch(closeFullSnippet());
  };

  const onShowEditForm = () => {
    dispatch(openEditSnippet());
    console.log("edit");
  };

  const onClose = () => {
    dispatch(closeFullSnippet());
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <button className="btn-close" onClick={onClose}>
            X
          </button>
        </div>
        <section className="center">
          <h2>{snippet.title}</h2>
          <div>
            <span className="date">
              {new Date(snippet.createdAt).toLocaleString("en-US")}
            </span>
            <p>{snippet.description}</p>
          </div>
        </section>
        <div className="code-container">
          <div className="language">
            <p> {snippet.language}</p>
          </div>
          <div className="code">
            <pre>
              <code>{snippet.code}</code>
            </pre>
          </div>
          <button
            className="btn-copy"
            title="Copy to your clipboard"
            onClick={onCopy}
          >
            {copied ? <FaCheck style={{ color: "green" }} /> : <FaRegCopy />}
          </button>
        </div>
        {mySnippets ? (
          <div className="buttons">
            <button
              className="fullSnippetsBtn edit-btn"
              onClick={onShowEditForm}
            >
              Edit
            </button>
            <button
              className="fullSnippetsBtn delete-btn"
              onClick={onShowDeleteConfirm}
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
        {onDeleteConfirm ? (
          <DeleteConfirmation
            onCloseConfirm={onCloseConfirm}
            onDelete={() => onDelete(snippet._id)}
          />
        ) : (
          ""
        )}

        {editSnippetModal ? <EditSnippetForm snippet={snippet} /> : ""}
      </div>
    </div>
  );
}

export default SnippetFull;
