import axios from "axios";
const API_URL = "/api/users/";

const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  console.log(res.data);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const login = async (userData) => {
  // const { email, password } = userData;
  const res = await axios.post(API_URL + "login", userData);
  const data = res.data;
  // const user = data.filter((user) => user.email === email);

  // if (user[0].password === password) {
  //   const userInObject = user[0];
  //   delete userInObject["password"];
  //   delete userInObject["confirmPassword"];
  //   localStorage.setItem("user", JSON.stringify(userInObject));
  // }
  // console.log(user);
  console.log(data);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  register,
  login,
  logout,
};

export default authService;
