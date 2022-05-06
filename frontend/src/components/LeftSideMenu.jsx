import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function LeftSideMenu() {
  const { following } = useSelector((state) => state.currentUser);

  // const listItems = following.map((number) => <li>{number}</li>);

  return (
    <div className="leftSideMenu">
      <h3>Followings</h3>
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
