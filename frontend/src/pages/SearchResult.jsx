import { useSelector } from "react-redux";
import Snippets from "../components/Snippets";
import Users from "../components/Users";

function SearchResult() {
  const { users, snippets } = useSelector((state) => state.searchResults);
  console.log(users, snippets);
  return (
    <div className="searchResult container">
      {users.length > 0 ? <Users users={users} /> : ""}
      {snippets.length > 0 ? (
        <Snippets snippets={snippets} isProfile={false} />
      ) : (
        "No Results Found"
      )}
    </div>
  );
}

export default SearchResult;
