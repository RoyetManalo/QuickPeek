import { useSelector } from "react-redux";
import Snippets from "../components/Snippets";
import Users from "../components/Users";

function SearchResult() {
  const { users, snippets } = useSelector((state) => state.searchResults);
  return (
    <div className="searchResult container">
      {users.length > 0 ? <Users users={users} /> : "No Users Found"}
      {snippets.length > 0 ? (
        <Snippets snippets={snippets} isProfile={false} />
      ) : (
        "No Snippets Found"
      )}
    </div>
  );
}

export default SearchResult;
