import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Snippets from "../components/Snippets";
import Form from "../components/Form";
import SnippetFull from "../components/SnippetFull";
import { useSelector, useDispatch } from "react-redux";
import {
  createSnippet,
  getMySnippets,
} from "../features/snippets/snippetSlice";
import Spinner from "../components/Spinner";
import {
  savedProfilePic,
  editUserInfo,
  getUserInfo,
} from "../features/currentUser/currentUserSlice";
import { FaRegEdit } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("user"));

  const { formModal, fullSnippetModal } = useSelector((state) => state.modal);
  const { isLoading } = useSelector((state) => state.snippet);

  const [selectMySnippet, setSelectMySnippet] = useState(true);
  const [selectSavedSnippet, setSelectSavedSnippet] = useState(false);
  const [showMySnippets, setShowMySnippets] = useState(true);
  const [snippet, setSnippet] = useState({
    title: "",
    desc: "",
    lang: "",
    code: "",
  });

  const [edit, setEdit] = useState(false);

  const { mySnippets, savedSnippets } = useSelector((state) => state.snippet);
  const { user } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.currentUser);
  const [formData, setFormData] = useState({
    firstName: info.firstName,
    lastName: info.lastName,
    username: info.username,
  });

  const { firstName, lastName, username } = formData;

  const onChoose = (e) => {
    const id = e.target.id;
    if (id === "1") {
      setSelectMySnippet(true);
      setSelectSavedSnippet(false);
      setShowMySnippets(true);
    } else if (id === "2") {
      setSelectSavedSnippet(true);
      setSelectMySnippet(false);
      setShowMySnippets(false);
    }
  };

  const addSnippet = async (snippet) => {
    dispatch(createSnippet(snippet));
  };

  const onViewFullSnippet = (id) => {
    const snippetFull = mySnippets.filter((snippet) => snippet._id === id);
    setSnippet(snippetFull[0]);
  };

  const onViewFullSnippetSaved = (id) => {
    const snippetFull = savedSnippets.filter((snippet) => snippet._id === id);
    setSnippet(snippetFull[0]);
  };

  const imageUpload = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const onUploadImage = () => {
    imageUpload.current.click();
  };

  const onImageChange = (e) => {
    // setImage([...e.target.files]);
    // console.log(image[0]);

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const onSaved = () => {
    dispatch(savedProfilePic());
  };
  const onCancel = () => {
    setSelectedFile(undefined);
  };

  const editProfile = () => {
    setEdit(true);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitChanges = (e) => {
    e.preventDefault();
    dispatch(editUserInfo(formData));
    setEdit(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }

    dispatch(getUserInfo());
    dispatch(getMySnippets());

    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
    // dispatch(reset());
  }, [selectedFile]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile container">
      {user ? (
        <>
          <section className="details" style={{ position: "relative" }}>
            <button
              style={{
                position: "absolute",
                right: "1rem",
                fontSize: "1.2rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={editProfile}
            >
              <FaRegEdit />
            </button>

            {selectedFile ? (
              <>
                <img
                  src={preview}
                  alt=""
                  onClick={onUploadImage}
                  className="profilePic"
                />
                <div className="savedCancel">
                  <button className="button ok" onClick={onSaved}>
                    Saved
                  </button>
                  <button className="button danger" onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <img
                className="profilePic"
                src={require("../img/user.jpg")}
                alt=""
                onClick={onUploadImage}
              />
            )}
            {/* <img
              src={require("../img/user.jpg")}
              alt=""
              onClick={onUploadImage}
            /> */}
            <div className="hidden">
              <input type="file" onChange={onImageChange} ref={imageUpload} />
            </div>
            {edit ? (
              <div className="userEditForm">
                <form className="flex flex-column">
                  <input
                    type="text"
                    value={firstName}
                    onChange={onChange}
                    name="firstName"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={onChange}
                    name="lastName"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={onChange}
                    name="username"
                  />
                  <div>
                    <button
                      type="submit"
                      className="danger"
                      onClick={submitChanges}
                    >
                      Submit
                    </button>
                    <button className="edit-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="userDetails">
                <h2>
                  {info.firstName} {info.lastName}
                </h2>
                <p className="center">@{info.username}</p>
              </div>
            )}
          </section>
          <section>
            <div className="title">
              <span
                className={
                  selectMySnippet ? "snippets-tab active" : "snippets-tab"
                }
                id="1"
                onClick={onChoose}
              >
                My Snippets
              </span>
              <span
                className={
                  selectSavedSnippet ? "snippets-tab active" : "snippets-tab"
                }
                id="2"
                onClick={onChoose}
              >
                Saved Snippets
              </span>
            </div>
            <div className="my-snippets">
              {showMySnippets ? (
                mySnippets.length > 0 ? (
                  <Snippets
                    snippets={mySnippets}
                    onViewFullSnippet={onViewFullSnippet}
                    isProfile={true}
                  />
                ) : (
                  "No Snippets"
                )
              ) : savedSnippets.length > 0 ? (
                <Snippets
                  snippets={savedSnippets}
                  onViewFullSnippet={onViewFullSnippetSaved}
                  isProfile={false}
                />
              ) : (
                "No Saved Snippets"
              )}
            </div>
          </section>
        </>
      ) : (
        <h1>NOT ALLOWED</h1>
      )}
      {formModal && <Form addSnippet={addSnippet} />}
      {fullSnippetModal && (
        <SnippetFull
          snippet={snippet}
          isProfile={true}
          showBtn={false}
          mySnippets={selectMySnippet}
        />
      )}
    </div>
  );
}

export default Profile;
