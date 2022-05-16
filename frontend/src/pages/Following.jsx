import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";
function Following() {
  const { following } = useSelector((state) => state.currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [personPerPage, setPersonPerPage] = useState(6);

  const indexOfLastPerson = currentPage * personPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personPerPage;
  const currentPerson = following.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(currentPerson);
  return (
    <div className="following container">
      <h2 style={{ marginBottom: "2rem" }}>Following</h2>
      <div className="grid grid-3">
        {currentPerson.length > 0
          ? currentPerson.map((person) => (
              <div key={person._id}>
                <img
                  src={require("../img/user.jpg")}
                  alt=""
                  className="profilePic"
                />
                <div>
                  <h2>
                    {person.firstName} {person.lastName}
                  </h2>
                  <p>@{person.username}</p>
                </div>
              </div>
            ))
          : "Wow Such Empty"}
      </div>
      <Pagination
        personPerPage={personPerPage}
        totalPerson={following.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Following;
