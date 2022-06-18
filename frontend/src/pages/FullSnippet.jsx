import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSnippet } from "../features/snippets/snippetSlice";
import { FaRegCopy, FaCheck, FaRegStar, FaStar } from "react-icons/fa";

import {
  addStar,
  unStar,
  addToSavedSnippets,
  removeToSavedSnippets,
} from "../features/snippets/snippetSlice";

function FullSnippet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { snippet, savedSnippets, starredSnippets } = useSelector(
    (state) => state.snippet
  );
  const [copied, setOnCopied] = useState(false);
  const [onStarred, setOnStarred] = useState(false);
  const [onSaved, setOnSaved] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    // create notif after code is copy
    setOnCopied(true);

    setTimeout(() => {
      setOnCopied(false);
    }, 3000);
  };

  const onStar = () => {
    if (onStarred) {
      setOnStarred(false);
      dispatch(unStar(id));
    } else {
      dispatch(addStar(id));
    }
  };

  const onSave = () => {
    const snippetToAlter = { id: id };

    if (onSaved) {
      setOnSaved(false);
      dispatch(removeToSavedSnippets(snippetToAlter));
    } else {
      dispatch(addToSavedSnippets(snippetToAlter));
    }
  };

  useEffect(() => {
    const savedSnippetsIDS = savedSnippets.map((snippet) => snippet._id);
    const starredSnippetsID = starredSnippets.map((snippet) => snippet._id);

    setOnSaved(savedSnippetsIDS.includes(id));
    setOnStarred(starredSnippetsID.includes(id));
  });

  useEffect(() => {
    dispatch(getSnippet(id));
  }, [id]);
  return (
    <div className="fullSnippet container">
      {snippet.map((snip) => (
        <div
          key={snip._id}
          style={{
            position: "relative",
          }}
        >
          <div className="star-save">
            <button className="btn-star" onClick={onStar}>
              {onStarred ? (
                <span className="flex">
                  {snippet[0].star.length}
                  <FaStar style={{ color: "#f1bb09" }} />
                </span>
              ) : (
                <FaRegStar />
              )}
            </button>
            <button className="btn-save" onClick={onSave}>
              {onSaved ? "Saved" : "Save"}
            </button>
          </div>
          <img
            src={require("../img/user.jpg")}
            style={{
              width: "50px",
              position: "absolute",
              top: "0",
              left: "2.5rem",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "3.5rem",
              left: "1rem",
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
              {copied ? <FaCheck style={{ color: "green" }} /> : <FaRegCopy />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FullSnippet;
