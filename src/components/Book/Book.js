import { Link } from "react-router-dom";
import styles from "./Book.module.css"

const Book = ({ bookData }) => {
  return (
    <Link to={`/books/${bookData.id}`} className={styles.bookCont}>
      <img src={bookData.cover_image} className={styles.bookCover} />
      <span className={styles.bookTitle}>{bookData.title}</span>
    </Link>
  );
};

export default Book;
