import { useSelector, useDispatch } from "react-redux";
import { openForm } from "../features/modals/modalSlice";
import { useState } from "react";
// import { searchSnippet } from "../features/snippets/snippetSlice";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { searchUser } from "../features/users/userSlice";
import {
  searchUser,
  searchSnippet,
  reset,
} from "../features/search/searchSlice";

function SearchAddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const onFormOpen = () => {
    dispatch(openForm());
  };

  const [searchQuery, setSearchQuery] = useState("");

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    // dispatch(searchSnippet(searchQuery));
    // dispatch(searchUser(searchQuery));
    dispatch(reset());
    dispatch(searchSnippet(searchQuery));
    dispatch(searchUser(searchQuery));

    // history.push(`/search?query=${searchQuery}`);
    // navigate(`/search?query=${searchQuery}`, { replace: true });
    navigate(`/search`, { replace: true });
  };

  return (
    <section className="header-form">
      <button className="btn m-20" onClick={onFormOpen}>
        Create new snippet
      </button>
      <form onSubmit={onSearch}>
        <div className="form-group">
          <input
            type="text"
            className=""
            id="searchText"
            name="searchText"
            value={searchQuery}
            placeholder="Search..."
            onChange={onChange}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchAddForm;
