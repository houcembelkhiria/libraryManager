import React, { useState } from "react";
import "../styles/Sidebar.css";  
import { useNavigate ,Link } from "react-router-dom"; 
function Sidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  

  const navigate = useNavigate(); // Hook to navigate programmatically
  const toggleSidebar = () => {
   // console.log("Toggling Sidebar: ", !isSidebarVisible);  
    setIsSidebarVisible(!isSidebarVisible); 
  };

  const userId = localStorage.getItem('UserId');
  const handleLogout = () => {
    localStorage.removeItem("UserId"); // Remove userId from localStorage
    navigate("/authenticate"); // Redirect to authenticate (login) page
  };
  const handleLogin = () => {
    navigate("/authenticate"); // Redirect to authenticate (login) page
  };

  
  return (
    <div className="sidebar-container">
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarVisible ? (
          <span className="icon cross-icon">&#10005;</span> 
        ) : (
          <span className="icon hamburger-icon">&#9776;</span> 
        )}
      </button>

      <div className={`sidebar ${isSidebarVisible ? "show" : "hide"}`}>
        <h2>&nbsp;</h2>
        {userId === "1" ? (
                  <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>


      )}        <ul>
          <li><Link to="/">Books</Link></li>
          <li><Link to="/MyCart">My cart</Link></li> 
          {userId === "1" && <li><Link to="/Admin">Administration</Link></li>}
        </ul>

      </div>

    </div>
  );
}

export default Sidebar;
