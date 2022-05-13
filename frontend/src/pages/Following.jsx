import { useSelector } from "react-redux";
function Following() {
  const { following } = useSelector((state) => state.currentUser);
  return (
    <div className="following container">
      <h2 style={{ marginBottom: "2rem" }}>Following</h2>
      <div className="grid grid-3">
        {following.length > 0
          ? following.map((person) => (
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
    </div>
  );
}

export default Following;
