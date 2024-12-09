import axios from 'axios';

const API_URL = "http://localhost:2093/api/";  // Replace with your actual API URL

// Axios instance for making requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBooks = () => {
    return api.get("/Books/GetBooks");
  };


  export const getBookById = (id) => {
    return api.get(`/Books/${id}`);
  };  

export const addBook = (book) => {
  return api.post("/Books/AddBook", book);
};

export const updateBook = (book) => {
  return api.put(`/Books/${book.id}`, book);
};
export const uploadBookImage = (book, imageFile) => {
  const formData = new FormData();
  formData.append("book", JSON.stringify(book));  // Append book data as JSON
  formData.append("image", imageFile);  // Append the image file

  return api.post(`/Books/UploadBookImage/${book.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",  // Set content type for file uploads
    },
  });
};


export const deleteBook = (id) => {
  return api.delete(`/Books/DeleteBooks/${id}`);
};

export const rentBook = (userId, bookId) => {
  return api.post(`/Books/RentBook?userId=${userId}&bookId=${bookId}`);
};
export const editBook = (Book) => {
  return api.put(`/Books/${Book.id}` , Book);
}; 

export const returnBook = (userId, bookId) => {
  return api.post(`/Books/ReturnBook?userId=${userId}&bookId=${bookId}`);
};


export const getUsers = () => {
  return api.get("/User/GetUsers");
};

export const addUser = (User) => {
  return api.post("/User/AddUser" , User);
};
export const editUser = (User) => {
  return api.put(`/User/{id}${User.id}` , User);
}; 

export const deleteUser = (id) => {
  return api.delete(`/User/DeleteUser/${id}`);
};


export const deleteTransaction = (id) => {
  return api.delete(`/Transactions/DeleteTransaction/${id}`);
};

export const toggleBookStatus = (bookId) => {
  return api.put(`/Books/ToggleStatus/${bookId}`);
};
export const getTransactionsByUserId = (userId) => {
  return api.get(`/Transactions/GetTransactionsByUserId/${userId}`);
};




/**
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise} API response containing UserId on success.
 */
export const authenticate = (email, password) => {
    return api.post("/User/Login", { email, password });
  };

  
