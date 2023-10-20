import { useCallback, useEffect, useState } from "react";
import axiosIns from "../../config/axios";
import Book from "../../components/Book/Book";
import styles from "./books.module.css"
import BookFilter from "../../components/BookFilter/BookFilter";

const Books = () => {
  const [booksData, setBooksData] = useState(null);

  const getBooksData = useCallback(async (search = "", authorId = "") => {
    try {
      let url = "/books?";
      if (search)
        url += `title=${search}&`
      if (authorId) {
        url += `author_id=${authorId}`
      }
      const { data } = await axiosIns.get(url);
      setBooksData(data);
    } catch (err) {
      console.log(err);
      setBooksData([]);
    }
  });

  useEffect(() => {
    getBooksData();
  }, []);

  if (!booksData) return null;

  return (
    <>
      <BookFilter getBooksData={getBooksData} />
      {booksData.length ? (
        <div className={styles.booksWrapper}>
          {booksData.map((bookData, idx) => (
            <Book
              key={bookData.id}
              bookData={bookData}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noBooks}>No Books Found</p>
      )}
    </>
  );
};

export default Books;
