import React, { useState } from "react";
import "./index.css";

import userIcon from "../Assets/user.svg";
import emailIcon from "../Assets/email.svg";
import passwordIcon from "../Assets/password.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formDetails.username || !formDetails.email || !formDetails.password) {
      alert("All fields are required!");
      return;
    }
    try {
      const url = "http://localhost:5000/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Registration failed!");
      }
      const data = await response.json();
      console.log("Response:", data);
      setFormDetails({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <img src={userIcon} alt="user" />
            <input
              type="text"
              name="username"
              value={formDetails.username}
              placeholder="Username"
              onChange={handleOnChange}
              required
            />
          </div>

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

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-text">
          If you have an account, <span>Login here</span>
        </p>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
