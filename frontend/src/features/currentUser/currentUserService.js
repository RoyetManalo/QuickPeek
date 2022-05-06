import axios from "axios";
const API_URL = "/api/users/";
const ADD_FOLLOWING_API_URL = "/api/users/following/add/";
const REMOVE_FOLLOWING_API_URL = "/api/users/following/remove/";

export const savedProfilePic = async (img, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}getFollowers`, config);
  return res.data;
};

export const getFollowers = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}getFollowers`, config);
  return res.data;
};
export const getFollowing = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}getFollowing`, config);
  return res.data;
};

const addToFollowing = async (token, userID, userIDToFollow) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(
    ADD_FOLLOWING_API_URL + userID,
    userIDToFollow,
    config
  );
  return res.data;
};

const removeToFollowing = async (token, userID, userIDToFollow) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(
    REMOVE_FOLLOWING_API_URL + userID,
    userIDToFollow,
    config
  );
  return res.data;
};

export const currentUserService = {
  savedProfilePic,
  getFollowers,
  getFollowing,
  addToFollowing,
  removeToFollowing,
};

export default currentUserService;
