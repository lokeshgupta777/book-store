import { useCallback, useEffect, useState } from "react";
import axiosIns from "../../config/axios";
import Book from "../../components/Book/Book";
import styles from "./books.module.css"
import BookFilter from "../../components/BookFilter/BookFilter";
import { useSearchParams } from "react-router-dom";

const Books = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [booksData, setBooksData] = useState(null);

  const getBooksData = async () => {
    try {
      let url = "/books?";
      let search = searchParams.get('title')
      if (search)
        url += `title=${search}&`

      let authorId = searchParams.get('author_id')
      if (authorId) {
        url += `author_id=${authorId}`
      }
      const { data } = await axiosIns.get(url);
      setBooksData(data);
    } catch (err) {
      console.log(err);
      setBooksData([]);
    }
  };

  useEffect(() => {
    getBooksData();
  }, [searchParams]);

  if (!booksData) return null;

  return (
    <>
      <BookFilter searchParams={searchParams} setSearchParams={setSearchParams} />
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
