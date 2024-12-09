import React, { useState } from "react";
import { addBook } from "../services/api";
import "../styles/AddBook.css"; // Add custom CSS for drawer styling

function AddBook() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Available");
  const [copiesAvailable, setCopiesAvailable] = useState(1);
  const [copiesTotal, setCopiesTotal] = useState(1);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(""); 
  const [message, setMessage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddBook = async () => {
    const newBook = {
      title,
      author,
      genre,
      status,
      copiesAvailable,
      copiesTotal
    };

    try {
      await addBook(newBook);
      setMessage("Book added successfully!");
    } catch (error) {
      console.error("Error adding book", error);
      setMessage("Error adding book. Please try again.");
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer visibility
  };

  return (
    <div className="ab-addBookForm">
      <button className="ab-open-drawer-btn" onClick={toggleDrawer}>
        Add Book
      </button>

      <div className={`ab-sidebar-drawer ${isDrawerOpen ? "ab-open" : "ab-closed"}`}>
        <div className="ab-drawer-content">
          <button className="ab-close-drawer-btn" onClick={toggleDrawer}>X</button>
          <h1>Add Book</h1>
          <div>
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ab-input"
            />
          </div>

          <div>
            <label>Author: </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="ab-input"
            />
          </div>
          <div>
            <label>Genre: </label>
            <select 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
              className="ab-select"
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>

          <div>
            <label>Status: </label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="ab-select"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label>Copies Available: </label>
            <input
              type="number"
              value={copiesAvailable} 
              onChange={(e) => {
                const value = Number(e.target.value);
                setCopiesAvailable(value);
                setCopiesTotal(value); 
              }}
              className="ab-input"
            />
          </div>

          <button onClick={handleAddBook} className="ab-add-button">Add Book</button>
          {message && <p className="ab-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddBook;
