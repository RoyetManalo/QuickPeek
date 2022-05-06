import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loggedIn, login } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));

    if (isLoading) {
      return <Spinner />;
    }
  };
  return (
    <div className="login">
      <section className="heading">
        <h1 className="title">
          <FaSignInAlt />
          Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block btn-light">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
