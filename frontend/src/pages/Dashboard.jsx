import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Users from "../components/Users";
import CreateSnippet from "../components/CreateSnippet";
import Snippets from "../components/Snippets";
import Form from "../components/Form";
import SnippetFull from "../components/SnippetFull";
import { useSelector, useDispatch } from "react-redux";
import {
  getFeed,
  getSnippets,
  getSavedSnippets,
  getStarredSnippets,
} from "../features/snippets/snippetSlice";
import Spinner from "../components/Spinner";
import {
  getFollowers,
  getFollowing,
} from "../features/currentUser/currentUserSlice";
import { reset } from "../features/search/searchSlice";

function Dashboard() {
  const userLS = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formModal, fullSnippetModal } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  const { searchedSnippets } = useSelector((state) => state.snippet);
  const [snippetFeed, setSnippetFeed] = useState([]);

  // const [snippets, setSnippets] = useState([]);

  const [snippet, setSnippet] = useState({
    title: "",
    desc: "",
    lang: "",
    code: "",
  });

  const { feed, isLoading } = useSelector((state) => state.snippet);
  const { users, snippets } = useSelector((state) => state.searchResults);

  useEffect(() => {
    // problem after logout
    if (!user) {
      navigate("/landing");
    }

    dispatch(getFeed());
    dispatch(getSnippets());
    dispatch(getStarredSnippets());
    dispatch(getSavedSnippets());
    dispatch(getFollowers());
    dispatch(getFollowing());

    // dispatch action on dismount
    return () => {
      dispatch(reset());
    };
  }, []); // i remove the user dependency because the getSnippets action redispatch every add to saved snmippets

  const onViewFullSnippet = (id) => {
    console.log(id);
    const snippetFull = feed.filter((snippet) => snippet._id === id);
    console.log(snippetFull);
    setSnippet(snippetFull[0]);
    console.log(snippetFull[0]);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="snippets container">
        <CreateSnippet />
        {feed.length > 0 ? (
          <Snippets
            snippets={feed}
            onViewFullSnippet={onViewFullSnippet}
            isProfile={false}
          />
        ) : (
          "Wow! Such empty"
        )}
      </section>

      {formModal ? <Form /> : ""}
      {fullSnippetModal ? (
        <SnippetFull snippet={snippet} isProfile={false} />
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;
