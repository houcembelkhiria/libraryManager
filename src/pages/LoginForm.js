import React, { useState } from "react";
import { authenticate } from "../services/api";
import {Link ,  useNavigate } from "react-router-dom";
import "../styles/LoginForm.css"; // Custom CSS for styling the login form

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authenticate(email, password);

      console.log("API Response:", response);

      // Access userId from the response and store it
      const userId = response.data?.userId;
      if (!userId) {
        throw new Error("UserId not found in the API response.");
      }
  
      // Save userId in localStorage
      localStorage.setItem("UserId", userId);
      setMessage("Login successful!");
      navigate("/");

    } catch (error) {
      setMessage(error.response?.data?.Message || "Login failed.");
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Login</h1>
      <div className="login-form-field">
        <label className="login-form-label">Email:</label>
        <input
          className="login-form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-form-field">
        <label className="login-form-label">Password:</label>
        <input
          className="login-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-form-btn" onClick={handleLogin}>Login</button>
      {message && <p className="login-form-message">{message}</p>}

      <Link to="/RegistrationForm">Register</Link>
    </div>
  );
}

export default LoginForm;
