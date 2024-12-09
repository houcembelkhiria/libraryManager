import React, { useEffect, useState } from "react";
import { getUsers, editUser, deleteUser } from "../services/api"; 
import "../styles/BookList.css";  

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);  
  const [formData, setFormData] = useState({ name: "", email: "" });  
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser({ ...selectedUser, ...formData });
      fetchUsers(); 
      setSelectedUser(null);  
    } catch (error) {
      console.error("Error editing user", error);
    }
  };

  const handleDeleteClick = async (userId) => {

      try {
        await deleteUser(userId);
        fetchUsers();  
      } catch (error) {
        console.error("Error deleting user", error);
      }
    
  };


  const availableUsers = users.filter((user) => user.id !== userId);

  return (
    <div className="book-list-container">
      <h1>Users List</h1>
      <div className="book-card-container">
        {availableUsers.length > 0 ? (
          availableUsers.map((user) => (
            <div className="book-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <div className="card-buttons">
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No available users at the moment.</p>
        )}
      </div>

      {selectedUser && (
        <div className="editUserFormContainer">
        <div className="edit-user-form">
          <h2>Edit User</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setSelectedUser(null)}>
              Cancel
            </button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
