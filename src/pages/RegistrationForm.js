import React, { useState } from "react";
import { addUser } from "../services/api"; // Assuming the axios function is in the api.js file
import "../styles/RegistrationForm.css"; // Custom CSS for styling the registration form
import { useNavigate ,Link } from "react-router-dom"; 

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipDate, setMembershipDate] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("Active");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
        name,
        email,
        phone,
        membershipDate: membershipDate || new Date().toISOString(),
        membershipStatus: membershipStatus || "Active",  
        password,
      };

    try {
      const response = await addUser(userData);
      setMessage("Registration successful!");
      navigate("/authenticate");
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error registering user", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-form-container">
      <h1 className="registration-form-title">Register</h1>
      <form onSubmit={handleRegister} className="registration-form">
        <div className="registration-form-field">
          <label className="registration-form-label">Name:</label>
          <input
            className="registration-form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="registration-form-field">
          <label className="registration-form-label">Email:</label>
          <input
            className="registration-form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="registration-form-field">
          <label className="registration-form-label">Phone:</label>
          <input
            className="registration-form-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>



        <div className="registration-form-field">
          <label className="registration-form-label">Password:</label>
          <input
            className="registration-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="registration-form-btn">Register</button>
        {message && <p className="registration-form-message">{message}</p>}
      </form>
      <Link to="/authenticate">Login</Link>
    </div>
  );
}

export default RegistrationForm;


/***
 *         <div className="registration-form-field">
          <label className="registration-form-label">Membership Date:</label>
          <input
            className="registration-form-input"
            type="date"
            value={membershipDate}
            onChange={(e) => setMembershipDate(e.target.value)}
            required
          />
        </div>

        <div className="registration-form-field">
          <label className="registration-form-label">Membership Status:</label>
          <select
            className="registration-form-input"
            value={membershipStatus}
            onChange={(e) => setMembershipStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
 */