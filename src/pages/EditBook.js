import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editBook, getBookById, uploadBookImage } from "../services/api";  // Add the image upload function here
import "../styles/EditBook.css";  // Import the CSS file for styling

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);  // State to hold the selected image file

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If there is a new image, upload it
      if (imageFile) {
        await uploadBookImage(book, imageFile);  // Upload the image along with book data
      }
      await editBook(book);  // Update book details
      navigate("/Admin");  // Navigate to the admin page after editing
    } catch (error) {
      console.error("Error editing book", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);  // Set the selected image file
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="edit-book-container">
      <h1 className="edit-book-title">Edit Book</h1>
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <input
            className="form-input"
            type="text"
            name="status"
            value={book.status || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Copies Available</label>
          <input
            className="form-input"
            type="number"
            name="copiesAvailable"
            value={book.copiesAvailable}
            onChange={handleChange}
          />
        </div>
        
        {/* Image Upload Section */}
        <div className="form-group">
          <label className="form-label">Book Image</label>
          <input
            className="form-input"
            type="file"
            onChange={handleImageChange}  // Set the image file when it's selected
          />
        </div>

        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditBook;
