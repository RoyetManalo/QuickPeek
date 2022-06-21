import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import {
  searchUser,
  searchSnippet,
  reset,
} from "../features/search/searchSlice";
import { openForm } from "../features/modals/modalSlice";
import UserSetting from "./UserSetting";
import { FaChevronDown } from "react-icons/fa";

function Header() {
  // const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  const onFormOpen = () => {
    dispatch(openForm());
  };
  const [showSettings, setShowSettings] = useState(false);

  const showSetting = () => {
    if (showSettings) {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-header">
          <Link to="/">
            <img
              src={require("../img/logo.png")}
              className="header-logo"
              alt="logo"
            />
          </Link>
          <form onSubmit={onSearch}>
            <input
              type="text"
              className="searchbar"
              id="searchText"
              name="searchText"
              value={searchQuery}
              placeholder="Search..."
              onChange={onChange}
            />
          </form>
        </div>

        <div className="right-header">
          <div className="addSnippetBtn">
            <button className="headerBtn" onClick={onFormOpen}>
              <FaPlus />
            </button>
          </div>
          <div className="userIcon" onClick={showSetting}>
            <img
              src={require("../img/user.jpg")}
              alt=""
              style={{ width: "40px", borderRadius: "50%" }}
            />
            <span style={{ color: "#353535" }} className="header-username">
              {user.firstName} {user.lastName}
            </span>
            <FaChevronDown style={{ color: "#000" }} />
          </div>
        </div>
        {showSettings && <UserSetting />}
      </div>
    </header>
  );
}

export default Header;
