import axios from "axios";
const API_URL = "/api/users/";
const SAVED_SNIPPET_API_URL = "/api/users/savedsnippets/add/";
const REMOVE_SNIPPET_API_URL = "/api/users/savedsnippets/remove/";

const getUserInfo = async (username, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(API_URL + "profile/" + username, config);
  console.log(res.data);
  return res.data;
};

const searchUser = async (query, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}search?query=${query}`, config);
  return res.data;
};

// const addToFollowing = async (token, userID, userIDToFollow) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };
//   const res = await axios.put(
//     ADD_FOLLOWING_API_URL + userID,
//     userIDToFollow,
//     config
//   );
//   console.log(res.data);
//   return res.data;
// };

// const removeToFollowing = async (token, userID, userIDToFollow) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };
//   const res = await axios.put(
//     REMOVE_FOLLOWING_API_URL + userID,
//     userIDToFollow,
//     config
//   );
//   console.log(res.data);
//   return res.data;
// };

const addToSavedSnippets = async (token, userID, snippetIDToSaved) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(
    SAVED_SNIPPET_API_URL + userID,
    snippetIDToSaved,
    config
  );
  console.log(res.data);
  return res.data;
};

const removeToSavedSnippets = async (token, userID, snippetIDToRemove) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(
    REMOVE_SNIPPET_API_URL + userID,
    snippetIDToRemove,
    config
  );
  console.log(res.data);
  return res.data;
};

export const userService = {
  getUserInfo,
  addToSavedSnippets,
  removeToSavedSnippets,
  searchUser,
};
export default userService;
