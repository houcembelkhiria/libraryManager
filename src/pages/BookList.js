import React, { useEffect, useState } from "react";
import { rentBook, getBooks, toggleBookStatus, deleteBook } from "../services/api";
import "../styles/BookList.css"; // Import the CSS file for styling

function BookList() {
  const [books, setBooks] = useState([]);
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

  const handleRent = async (userId, bookId) => {
    if (!userId) {
      alert("Please log in first to rent a book.");
      return;
    }

    try {
      await rentBook(userId, bookId);
      alert("Book rented successfully !");
      fetchBooks(); // Refresh the list after renting
    } catch (error) {
      console.error("Error renting book", error);
    }
  };

  // Filter books with status "Available"
  const availableBooks = books.filter(book => book.status === "Available");

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      <div className="book-card-container">
        {availableBooks.length > 0 ? (
          availableBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <h2>{book.title}</h2>
              <img src={book.image} />
              <p>Status: {book.status}</p>
              <p>Copies Available: {book.copiesAvailable}</p>
              <div className="card-buttons">
                <button 
                  onClick={() => handleRent(userId, book.id)} 
                  disabled={book.copiesAvailable <= 0}
                >
                  Rent
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No available books at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
