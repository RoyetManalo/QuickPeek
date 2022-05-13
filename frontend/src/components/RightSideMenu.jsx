import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function RightSideMenu() {
  const { snippets } = useSelector((state) => state.snippet);

  // Change feeds to all snippets
  // To sort a state - u need to create a new array for you to sort it
  const popularSnippets = [...snippets];

  popularSnippets.sort((a, b) => b.star.length - a.star.length);

  popularSnippets.splice(10, popularSnippets.length - 10);

  return (
    <div className="rightSideMenu" style={{ cursor: "pointer" }}>
      <div className="popular">
        <h2>Popular Snippets</h2>
        <ul>
          {popularSnippets.map((snippet) => {
            return (
              <li key={snippet._id} className="left">
                <Link to={`snippet/${snippet._id}`}>
                  <div className="text">
                    <p>
                      <FaStar style={{ color: "#f1bb09" }} className="star" />
                      {snippet.star.length}
                    </p>
                    <p className="center">{snippet.title}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default RightSideMenu;
