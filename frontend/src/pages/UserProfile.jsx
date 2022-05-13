import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Snippets from "../components/Snippets";
import SnippetFull from "../components/SnippetFull";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, getUserSnippets } from "../features/users/userSlice";
import {
  addToFollowing,
  removeToFollowing,
} from "../features/currentUser/currentUserSlice";

function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullSnippetModal } = useSelector((state) => state.modal);
  const { userInfo, userSnippets } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { following } = useSelector((state) => state.currentUser);

  // const id = userInfo._id;

  const [snippet, setSnippet] = useState({
    title: "",
    desc: "",
    lang: "",
    code: "",
  });

  const [onFollowing, setOnFollowing] = useState(false);

  const onFollow = () => {
    console.log(userInfo._id);
    setOnFollowing(true);

    const id = { id: userInfo._id };

    if (onFollowing) {
      setOnFollowing(false);
      dispatch(removeToFollowing(id));
    } else {
      dispatch(addToFollowing(id));
    } // finish this tommorow
  };

  useEffect(() => {
    const ids = following.map((follow) => follow._id);
    setOnFollowing(ids.includes(id));

    if (id === user._id) {
      navigate("/me");
    }

    // if (!userInfo) {
    //   navigate("/landing");
    // }

    // const getUserInfo = async () => {
    //   const { username } = useParams();
    // };

    dispatch(getUserInfo(id));
    // console.log(userInfo);
    dispatch(getUserSnippets(id));

    // dispatch(reset());
  }, [id]);

  console.log(onFollowing);

  const onViewFullSnippet = (id) => {
    const snippetFull = userSnippets.filter((snippet) => snippet._id === id);
    setSnippet(snippetFull[0]);
  };
  return (
    <div>
      <div className="profile container">
        {userInfo ? (
          <>
            <section className="details">
              <img src={require("../img/user.jpg")} alt="picture" />
              <h2>
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <p className="center">@{userInfo.username}</p>
              <div></div>
              <button className="btn-center" onClick={onFollow}>
                {onFollowing ? "Unfollow" : "Follow"}
              </button>
            </section>
            <section>
              <div className="my-snippets">
                {userSnippets ? (
                  userSnippets.length > 0 ? (
                    <Snippets
                      snippets={userSnippets}
                      onViewFullSnippet={onViewFullSnippet}
                    />
                  ) : (
                    "No Snippets"
                  )
                ) : (
                  <h1>Wow such empty</h1>
                )}
              </div>
            </section>
          </>
        ) : (
          <h1>User not Found</h1>
        )}
        {fullSnippetModal ? <SnippetFull snippet={snippet} /> : ""}
      </div>
    </div>
  );
}

export default UserProfile;
