import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import { useSelector } from "react-redux";
import UserProfile from "./pages/UserProfile";
import SearchResult from "./pages/SearchResult";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useSelector((state) => state.auth);
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Router>
        {user && (
          <>
            <Header />
            <LeftSideMenu />
            <RightSideMenu />
          </>
        )}

        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/me" element={<Profile />}></Route>
          <Route path="/profile/:id" element={<UserProfile />}></Route>
          <Route path="/search" element={<SearchResult />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
