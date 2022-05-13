import axios from "axios";
const API_URL = "/api/snippets/";
const MYSNIPPETS_API_URL = "/api/snippets/mysnippets/";
const USER_SNIPPETS_API_URL = "/api/snippets/getUserSnippets/";
const ADD_STAR_API_URL = "/api/snippets/star/add/";
const REMOVE_STAR_API_URL = "/api/snippets/star/remove/";

const getFeed = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(API_URL + "feed", config);
  const data = res.data;
  return data;
};

const getSnippets = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(API_URL, config);
  const data = res.data;
  const sortedData = data.sort((a, b) => a < b);
  return data;
};

const getSnippet = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}one/${id}`, config);
  const data = res.data;
  return data;
};

const getMySnippets = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(MYSNIPPETS_API_URL, config);
  const data = res.data;
  return data;
};

const getStarredSnippets = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(API_URL + "starredSnippets/", config);
  const data = res.data;
  return data;
};

const getSavedSnippets = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(API_URL + "savedSnippets/", config);
  const data = res.data;
  return data;
};

const getUserSnippets = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const userID = { id: id };
  console.log(userID);
  const res = await axios.post(USER_SNIPPETS_API_URL, userID, config);
  const data = res.data;
  return data;
};

const addSnippet = async (snippet, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(API_URL, snippet, config);
  const data = res.data;
  return data;
};

const editSnippet = async (id, snippet, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.put(API_URL + id, snippet, config);
  return res.data;
};

const deleteSnippet = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.delete(API_URL + id, config);
  return res.data;
};

const searchSnippet = async (query, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${API_URL}search?query=${query}`, config);
  return res.data;
};

const addStar = async (snippetID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1st param = url, 2nd param = body, 3rd param = config
  const res = await axios.put(ADD_STAR_API_URL + snippetID, "", config);
  return res.data;
};

const unStar = async (snippetID, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1st param = url, 2nd param = body, 3rd param = config
  const res = await axios.put(REMOVE_STAR_API_URL + snippetID, "", config);
  return res.data;
};

export const snippetsService = {
  getFeed,
  getSnippets,
  getSnippet,
  getSavedSnippets,
  getStarredSnippets,
  getMySnippets,
  getUserSnippets,
  addSnippet,
  editSnippet,
  deleteSnippet,
  searchSnippet,
  addStar,
  unStar,
};

export default snippetsService;
