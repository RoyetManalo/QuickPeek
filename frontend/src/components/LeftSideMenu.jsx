import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LeftSideMenu() {
  const { following } = useSelector((state) => state.currentUser);

  // const listItems = following.map((number) => <li>{number}</li>);

  return (
    <div className="leftSideMenu">
      <Link to="me/following">
        <h3>Following</h3>
      </Link>
      <ul>
        {following.length > 0
          ? following.map((follow) => {
              return (
                <li key={follow._id}>
                  <Link to={`/profile/${follow._id}`}>
                    {follow.firstName} {follow.lastName}
                  </Link>
                </li>
              );
            })
          : "You dont have any following"}
      </ul>
    </div>
  );
}

export default LeftSideMenu;
