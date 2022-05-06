import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFollowing,
  removeToFollowing,
} from "../features/currentUser/currentUserSlice";

function User({ user }) {
  const dispatch = useDispatch();

  const [onFollowing, setOnFollowing] = useState(false);
  const { following } = useSelector((state) => state.currentUser);

  const onFollow = () => {
    setOnFollowing(true);

    const id = { id: user._id };

    if (onFollowing) {
      setOnFollowing(false);
      dispatch(removeToFollowing(id));
    } else {
      dispatch(addToFollowing(id));
    } // finish this tommorow
  };

  useEffect(() => {
    const ids = following.map((follow) => follow._id);
    setOnFollowing(ids.includes(user._id));
  }, []);

  return (
    <div className="grid search-user">
      <div>
        <img src={require("../img/user.jpg")} alt="" />
      </div>
      <div className="user-details flex flex-column">
        <h1>
          <Link to={`/profile/${user._id}`}>
            {user.firstName} {user.lastName}
          </Link>
        </h1>
        <p>{user.username}</p>
        <button className="btn-center" onClick={onFollow}>
          {onFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default User;
