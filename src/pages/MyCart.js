import React, { useState, useEffect } from 'react';
import {deleteTransaction, returnBook, getTransactionsByUserId } from '../services/api';  // Assuming your API functions are in 'api.js'
import '../styles/MyCart.css';  // Assuming you're using a separate CSS file for styling

const MyCart = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the userId from local storage
  const userId = localStorage.getItem('UserId');


  const handleDeleteTransaction = async (transactionId) => {
    if (!userId) {
      alert("Please log in first to rent a book.");
      return;
    }

    try {
      await deleteTransaction(transactionId);
      getTransactionsByUserId(userId)
      .then(response => {
        setTransactions(response.data);
      })
    } catch (error) {
      console.error("Error renting book", error);
    }
  };


  const handleReturn = async (userId, bookId , transactionId) => {
    if (!userId) {
      alert("Please log in first to rent a book.");
      return;
    }

    try {
      await returnBook(userId, bookId);
      alert("Book returned successfully !");
      handleDeleteTransaction(transactionId);
      getTransactionsByUserId(userId)
      .then(response => {
        setTransactions(response.data);
      })
    } catch (error) {
      console.error("Error renting book", error);
    }
  };



  
  useEffect(() => {
    if (userId) {
      getTransactionsByUserId(userId)
        .then(response => {
          setTransactions(response.data);
        })
        .catch(err => {
          setError('Failed to fetch transactions.');
          console.error(err);
        });
    } else {
      setError('User ID not found in local storage.');
    }
  }, [userId]);

  return (
    <div className="my-cart">
      <h2>My Cart</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="transactions-container">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div className="transaction-card" key={transaction.id}>
              <h3 className="book-title">Book ID: {transaction.bookId}</h3>
              <p className="transaction-date">Issue Date: {transaction.issueDate}</p>
              <p className="transaction-date">Due Date: {transaction.dueDate}</p>
              <p className={`transaction-status ${transaction.status.toLowerCase()}`}>
                Status: {transaction.status}
              </p>
              <button onClick={() => handleReturn(userId, transaction.bookId , transaction.id) } >Return</button>
            </div>
          ))
        ) : (
          <p className="empty-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default MyCart;
