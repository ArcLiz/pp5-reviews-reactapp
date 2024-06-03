import React, {useState, useEffect} from "react";
import axios from "axios";
import {ListGroup, Form} from "react-bootstrap";
import styles from "../../styles/BookList.module.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books/");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, books]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.bookList}>
      <ListGroup>
        <Form className="mb-3">
          <Form.Control type="text" placeholder="Search by title or author..." value={searchTerm} onChange={handleChange} />
        </Form>
        {searchResults.map((book) => (
          <ListGroup.Item key={book.id} className={styles.bookItem}>
            <a href={`/books/${book.id}`} className={styles.bookLink}>
              <div className={styles.bookImageContainer}>
                <img src={book.cover_image} alt={book.title} className={styles.bookImage} />
              </div>
              <div className={styles.bookDetails}>
                <h5>{book.title}</h5>
                <p>
                  <strong>By:</strong> {book.author}
                </p>
                <p className={styles.bookComment}>
                  {book.description.substring(0, 150)}
                  {book.description.length > 150 ? "..." : ""}
                </p>
              </div>
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BooksList;
