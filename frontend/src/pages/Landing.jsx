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
    <div className="landing">
      <div className="landing-left">
        <div className="landing-logo">
          <img src={require("../img/logo.png")} alt="" />
        </div>

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
      </div>
      <div className="landing-right">
        <div className="right-content">
          <h1>Forgot how to center a div?</h1>
          <p>
            Register now to store all of your code snippets, and take a peek
            quickly when you need them. Follow other developers to see what code
            snippets they have.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
