import React, { useEffect, useState } from "react"; 
import { rentBook, getBooks, toggleBookStatus, deleteBook } from "../services/api";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Admin.css"; // Import the CSS file for styling
import AddBook from "./AddBook"; // Import the AddBook component (assuming it's in the same directory)

function Admin() {
  const [books, setBooks] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the visibility of the drawer
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleToggleStatus = async (bookId) => {
    try {
      await toggleBookStatus(bookId);
      fetchBooks(); // Refresh the list after status toggle
    } catch (error) {
      console.error("Error toggling book status", error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer visibility
  };

  return (
    <div className="book-list-container">
      <h1>Book List</h1>

      <div className={`sidebar-drawer ${isDrawerOpen ? "open" : "closed"}`}>
        <div className="drawer-content">
          <AddBook />
        </div>
      </div>

      <div className="book-card-container">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.title}</h2>
            <p>Status: {book.status}</p>
            <p>Copies Available: {book.copiesAvailable}</p>
            <div className="card-buttons">
              <button className="deleteButton" onClick={() => handleDelete(book.id)}>Delete</button>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={book.status === "Available"} // If book is rented, the switch is "on"
                  onChange={() => handleToggleStatus(book.id)} // Toggle status on change
                />
                <span className="slider round"></span>
              </label>
              {/* Edit Button that redirects to the Edit page */}
              <Link to={`/edit-book/${book.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
