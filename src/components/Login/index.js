import React, { useState } from "react";
import "./index.css";
import emailIcon from "../Assets/email.svg";
import passwordIcon from "../Assets/password.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formDetails.email || !formDetails.password) {
      alert("All fields are required!");
      return;
    }
    try {
      const url = "http://localhost:5000/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
        credentials: "include",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed!");
      }
      console.log(data.jwt_token);

      setFormDetails({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <img src={emailIcon} alt="email" />
            <input
              type="email"
              name="email"
              value={formDetails.email}
              placeholder="Email"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="input-box">
            <img src={passwordIcon} alt="password" />
            <input
              type="password"
              name="password"
              value={formDetails.password}
              placeholder="Password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          If you don't have an account, <span>Register here</span>
        </p>
        <button className="register-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
