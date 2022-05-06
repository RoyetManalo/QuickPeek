import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchAddForm from "./SearchAddForm";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

function RightSideMenu({ onClick }) {
  const { snippets } = useSelector((state) => state.snippet);

  // Change feeds to all snippets
  // To sort a state - u need to create a new array for you to sort it
  const popularSnippets = [...snippets];

  popularSnippets.sort((a, b) => b.star.length - a.star.length);

  return (
    <div className="rightSideMenu">
      {/* <SearchAddForm onClick={onClick} /> */}
      <div className="popular">
        <h2>Popular Snippets</h2>
        <ul>
          {popularSnippets.map((snippet) => {
            return (
              <li key={snippet._id} className="left">
                <div className="text">
                  <p>
                    <FaStar style={{ color: "#f1bb09" }} className="star" />
                    {snippet.star.length}
                  </p>
                  <p className="center">{snippet.title}</p>
                </div>
              </li>
            );
          })}
          {/* {feed
            .sort((a, b) => a - b)
            .map((snippet) => {
              return (
                <li key={snippet._id}>
                  <span>{snippet.title}</span>
                </li>
              );
            })} */}
        </ul>
      </div>
    </div>
  );
}

export default RightSideMenu;
