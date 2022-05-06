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
import { savedProfilePic } from "../features/currentUser/currentUserSlice";

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

  const { mySnippets, savedSnippets } = useSelector((state) => state.snippet);
  const { user } = useSelector((state) => state.auth);

  // const mySnippets = snippets.filter((snippet) => snippet.user === user._id);

  // sample data
  // const savedSnippets = mySnippets.filter((snippet) => snippet.id === 0);

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

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }

    // dispatch(getSnippets());
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
          <section className="details">
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
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p className="center">@{user.username}</p>
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
      {formModal ? <Form addSnippet={addSnippet} /> : ""}
      {fullSnippetModal ? (
        <SnippetFull
          snippet={snippet}
          isProfile={true}
          showBtn={false}
          mySnippets={selectMySnippet}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
