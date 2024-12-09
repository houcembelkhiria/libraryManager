import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./pages/BookList";
import RentBook from "./pages/RentBook";
import AddBook from "./pages/AddBook";
import LoginForm from "./pages/LoginForm";
import Admin from "./pages/Admin";
import Sidebar from "./components/Sidebar";
import RegistrationForm from "./pages/RegistrationForm";
import MyCart from "./pages/MyCart";
import EditBook from "./pages/EditBook";
import UserList from "./pages/UserList";
import Administration from "./pages/Administration";

function App() {
  return (
    <Router>
      <div>
        <h1>Library Management</h1>
<Sidebar/>
        
        {/* Routes */}
        <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/bookList" element={<Admin/>} />

          <Route path="/Admin" element={<Administration />} />
          <Route path="/rent-book" element={<RentBook />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/authenticate" element={<LoginForm />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/MyCart" element={<MyCart />} />
          <Route path="/edit-book/:id" element={<EditBook />} />

          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
