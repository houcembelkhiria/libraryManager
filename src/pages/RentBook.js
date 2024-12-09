import React, { useState } from "react";
import { rentBook, getBooks } from "../services/api";

function RentBook() {
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");

  const handleRentBook = async () => {
    try {
      await rentBook(userId, bookId);
      setMessage("Book rented successfully!");
    } catch (error) {
      console.error("Error renting book", error);
      setMessage("Error renting book. Please try again.");
    }
  };

  return (
    <div>
      <h1>Rent Book</h1>
      <div>
        <label>User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Book ID: </label>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
      </div>
      <button onClick={handleRentBook}>Rent Book</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RentBook;
