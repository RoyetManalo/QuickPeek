import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openForm } from "../features/modals/modalSlice";
function CreateSnippet() {
  const dispatch = useDispatch();
  const onFormOpen = () => {
    dispatch(openForm());
  };
  return (
    <div className="createSnippet">
      <Link to="/me">
        <img
          src={require("../img/user.jpg")}
          alt=""
          style={{ width: "50px", borderRadius: "50%" }}
        />
      </Link>

      <div>
        <input
          type="text"
          placeholder="Create Snippet"
          style={{ width: "100%", padding: "10px" }}
          onClick={onFormOpen}
        />
      </div>
    </div>
  );
}

export default CreateSnippet;
