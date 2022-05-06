import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { FaEye, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

function UserSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    // localStorage.removeItem("user");
    dispatch(logout());
    navigate("/landing");
    // dispatch(loggedOut());
  };

  const goToProfile = () => {
    navigate("/me");
  };
  return (
    <div className="userSetting">
      <ul>
        <li onClick={goToProfile}>
          <FaUser style={{ marginRight: "10px" }} />
          Profile
        </li>
        <li onClick={onLogout}>
          <FaSignInAlt style={{ marginRight: "10px" }} />
          Logout
        </li>
      </ul>
    </div>
  );
}

export default UserSetting;
