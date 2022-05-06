import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  closeEditSnippet,
  closeForm,
  closeFullSnippet,
} from "../features/modals/modalSlice";
import { editSnippet } from "../features/snippets/snippetSlice";

function EditSnippetForm({ snippet }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: snippet.title,
    description: snippet.description,
    language: snippet.language,
    code: snippet.code,
  });

  const { title, description, language, code } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const snippetToSend = {
      _id: snippet._id,
      title,
      description,
      language,
      code,
      user: user._id,
    };

    // addSnippet(snippet);
    dispatch(editSnippet(snippetToSend));
    dispatch(closeFullSnippet());
    dispatch(closeEditSnippet());

    setFormData({
      title: "",
      description: "",
      language: "",
      code: "",
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClose = () => {
    dispatch(closeEditSnippet());
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <button className="btn-close" onClick={onClose}>
            X
          </button>
        </div>
        <section>
          <h2>Create new snippets</h2>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                placeholder="title"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="desc"
                name="description"
                value={description}
                placeholder="Description"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="lang"
                name="language"
                value={language}
                placeholder="Language"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                id="code"
                name="code"
                value={code}
                placeholder="Code"
                rows={15}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditSnippetForm;
