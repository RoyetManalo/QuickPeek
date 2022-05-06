import { useState } from "react";
import { closeForm } from "../features/modals/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { createSnippet } from "../features/snippets/snippetSlice";
function Form() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    code: "",
  });

  const { title, description, language, code } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const snippet = {
      title,
      description,
      language,
      code,
      user: user._id,
    };

    // addSnippet(snippet);
    dispatch(createSnippet(snippet));

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
    dispatch(closeForm());
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
          <h2 className="center">Create new snippets</h2>
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
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Form;
