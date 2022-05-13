import { useSelector, useDispatch } from "react-redux";
import { openFullSnippet } from "../features/modals/modalSlice";
import { FaRegCopy, FaRegStar, FaCheck, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  addStar,
  unStar,
  addToSavedSnippets,
  removeToSavedSnippets,
} from "../features/snippets/snippetSlice";

function Snippet({ snippet, onViewFullSnippet, isProfile }) {
  const [copied, setOnCopied] = useState(false);
  const [onStarred, setOnStarred] = useState(false);
  const [onSaved, setOnSaved] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    // create notif after code is copy
    setOnCopied(true);

    setTimeout(() => {
      setOnCopied(false);
    }, 3000);
  };

  const { user } = useSelector((state) => state.auth);
  const { feed, savedSnippets, starredSnippets } = useSelector(
    (state) => state.snippet
  );

  useEffect(() => {
    if (user) {
      const savedSnippetsIDS = savedSnippets.map((snippet) => snippet._id);
      const starredSnippetsID = starredSnippets.map((snippet) => snippet._id);

      setOnSaved(savedSnippetsIDS.includes(snippet._id));
      setOnStarred(starredSnippetsID.includes(snippet._id));
    }
  });

  const onStar = () => {
    if (onStarred) {
      setOnStarred(false);
      dispatch(unStar(snippet._id));
    } else {
      dispatch(addStar(snippet._id));
    }
  };

  const onSave = () => {
    const snippetToAlter = { id: snippet._id };

    if (onSaved) {
      setOnSaved(false);
      dispatch(removeToSavedSnippets(snippetToAlter));
    } else {
      dispatch(addToSavedSnippets(snippetToAlter));
    }
  };

  const onView = () => {
    // onViewFullSnippet(snippet._id);
    // dispatch(openFullSnippet());

    if (isProfile) {
      navigate(`snippet/${snippet._id}`);
    } else {
      navigate(`/snippet/${snippet._id}`);
    }
    // history.push(`/snippet/${snippet._id}`);
  };

  return (
    <div className="snippet">
      <img src={require("../img/user.jpg")} alt="" className="user-avatar" />
      {!isProfile && (
        <Link to={`/profile/${snippet.user._id}`}>
          <p className="user-name">
            {snippet.user.firstName} {snippet.user.lastName}
          </p>
        </Link>
      )}
      <h1>{snippet.title}</h1>
      <p className="snippet-time">{moment(snippet.createdAt).fromNow()}</p>
      <div className="code-container">
        <div className="language">
          <p> {snippet.language}</p>
        </div>
        <div className="code">
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </div>

        <button className="btn-view" onClick={onView}>
          View Full Snippet
        </button>

        <button
          className="btn-copy"
          title="Copy to your clipboard"
          onClick={onCopy}
        >
          {copied ? <FaCheck style={{ color: "green" }} /> : <FaRegCopy />}
        </button>
      </div>
      {!isProfile && (
        <div className="star-save">
          <button className="btn-star" onClick={onStar}>
            {onStarred ? (
              <span className="flex">
                {snippet.star.length}
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
      )}
    </div>
  );
}

export default Snippet;
