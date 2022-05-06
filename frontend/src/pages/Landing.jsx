import Login from "../pages/Login";
import Register from "../pages/Register";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";

function Landing() {
  const dispatch = useDispatch();
  const [choosen, setChoosen] = useState();
  const onChoose = (e) => {
    setChoosen(e.target.textContent);
  };
  const { message } = useSelector((state) => state.auth);
  const { isError } = useSelector((state) => state.auth);

  const notify = () => toast.error(message);

  useEffect(() => {
    if (isError) {
      notify();
    }

    return () => {
      dispatch(reset());
    };
  });

  return (
    <div className="landing grid grid-2">
      <div className="landing-left">
        <div className="landing-logo">
          <img
            src={require("../img/qplogo.png")}
            alt=""
            style={{ width: "220px" }}
          />
        </div>
        <div className="landing-content">
          <h1 className="center">Forgot how to center a div ?</h1>
          <p className="center">
            Register now to store all of your snippets, and see other devs what
            code snippets they have
          </p>
        </div>
        <img
          src={require("../img/abstract code.jpg")}
          alt=""
          style={{ width: "1360px" }}
        />
      </div>
      <div className="landing-right">
        <div className="loginRegister flex">
          <h1
            onClick={onChoose}
            className={choosen === "Register" ? "" : "underline"}
          >
            Login
          </h1>
          <h1
            onClick={onChoose}
            className={choosen === "Register" ? "underline" : ""}
          >
            Register
          </h1>
        </div>
        {choosen === "Register" ? <Register /> : <Login />}
        <footer className="sticky">
          <p className="center">A Personal Project by Royet Manalo</p>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
