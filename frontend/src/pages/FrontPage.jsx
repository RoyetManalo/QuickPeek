import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="frontPage container">
      <h1>Forgot how to center a div ?</h1>
      <p>
        Register now to store all of your snippets, and see other devs what code
        snippets they have
      </p>
    </div>
  );
}

export default FrontPage;
