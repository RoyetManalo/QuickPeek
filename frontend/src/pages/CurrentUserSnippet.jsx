import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSnippet } from "../features/snippets/snippetSlice";
import { FaRegCopy, FaCheck, FaEllipsisH } from "react-icons/fa";
import SnippetSetting from "../components/SnippetSetting";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EditSnippetForm from "../components/EditSnippetForm";
import {
  closeFullSnippet,
  openEditSnippet,
} from "../features/modals/modalSlice";
import {
  deleteSnippet,
  removeSnippet,
} from "../features/snippets/snippetSlice";

function CurrentUserSnippet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { snippet } = useSelector((state) => state.snippet);
  const [copied, setOnCopied] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [onDeleteConfirm, setOnDeleteConfirm] = useState(false);

  const { editSnippetModal } = useSelector((state) => state.modal);

  const onShowEditForm = () => {
    dispatch(openEditSnippet());
    setShowSetting(false);
  };
  const onShowDeleteConfirm = () => {
    setOnDeleteConfirm(true);
    setShowSetting(false);
  };

  const onCloseConfirm = () => {
    setOnDeleteConfirm(false);
  };

  const onDelete = (id) => {
    dispatch(deleteSnippet(id));
    setOnDeleteConfirm(false);
    dispatch(closeFullSnippet());
    dispatch(removeSnippet());
    setShowSetting(false);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    // create notif after code is copy
    setOnCopied(true);

    setTimeout(() => {
      setOnCopied(false);
    }, 3000);
  };

  const showSnippetSetting = () => {
    if (showSetting) {
      setShowSetting(false);
    } else {
      setShowSetting(true);
    }
  };

  useEffect(() => {
    dispatch(getSnippet(id));
  }, [id]);
  return (
    <div className="fullSnippet container" style={{ position: "relative" }}>
      {snippet.length > 0
        ? snippet.map((snip) => (
            <div
              key={snip._id}
              style={{
                position: "relative",
              }}
            >
              <div>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    fontSize: "30px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    cursor: "pointer",
                  }}
                  onClick={showSnippetSetting}
                >
                  <FaEllipsisH />
                </button>
              </div>
              <img
                src={require("../img/user.jpg")}
                style={{
                  width: "60px",
                  position: "absolute",
                  top: "0",
                  left: "1rem",
                  borderRadius: "50%",
                }}
              />
              {/* <span
                style={{
                  position: "absolute",
                  top: "3.5rem",
                  left: "1rem",
                  borderRadius: "50%",
                }}
              >
                {snip.user.firstName} {snip.user.lastName}
              </span> */}
              <section className="center">
                <h2>{snip.title}</h2>
                <div>
                  <span className="date">
                    {new Date(snip.createdAt).toLocaleString("en-US")}
                  </span>
                  <p style={{ marginTop: "2rem" }}>{snip.description}</p>
                </div>
              </section>
              <div className="code-container mt-3">
                <div className="language">
                  <p> {snip.language}</p>
                </div>
                <div className="code">
                  <pre>
                    <code>{snip.code}</code>
                  </pre>
                </div>
                <button
                  className="btn-copy"
                  title="Copy to your clipboard"
                  onClick={onCopy}
                >
                  {copied ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaRegCopy />
                  )}
                </button>
              </div>
            </div>
          ))
        : "Wow Such Empty"}
      {/* {snippet.map((snip) => (
        <div
          key={snip._id}
          style={{
            position: "relative",
          }}
        >
          <div>
            <button
              style={{
                border: "none",
                background: "none",
                fontSize: "30px",
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
              }}
              onClick={showSnippetSetting}
            >
              <FaEllipsisH />
            </button>
          </div>
          <img
            src={require("../img/user.jpg")}
            style={{
              width: "100px",
              position: "absolute",
              top: "0",
              left: "0.5rem",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "6.5rem",
              left: "0",
              borderRadius: "50%",
            }}
          >
            {snip.user.firstName} {snip.user.lastName}
          </span>
          <section className="center">
            <h2>{snip.title}</h2>
            <div>
              <span className="date">
                {new Date(snip.createdAt).toLocaleString("en-US")}
              </span>
              <p>{snip.description}</p>
            </div>
          </section>
          <div className="code-container mt-3">
            <div className="language">
              <p> {snip.language}</p>
            </div>
            <div className="code">
              <pre>
                <code>{snip.code}</code>
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
        </div>
      ))} */}
      {showSetting && (
        <SnippetSetting
          onEdit={onShowEditForm}
          onDelete={onShowDeleteConfirm}
        />
      )}
      {onDeleteConfirm && (
        <DeleteConfirmation
          onCloseConfirm={onCloseConfirm}
          onDelete={() => onDelete(snippet[0]._id)}
        />
      )}

      {editSnippetModal && <EditSnippetForm snippet={snippet} />}
    </div>
  );
}

export default CurrentUserSnippet;
