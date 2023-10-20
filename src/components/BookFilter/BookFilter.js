import { useEffect, useState } from "react"
import axiosIns from "../../config/axios";
import styles from "./BookFilter.module.css"

let debounceIntervalId = null;

const BookFilter = ({ getBooksData }) => {
  const [bookSearchTxt, setBookSearchTxt] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorsList, setAuthorsList] = useState([]);

  const searchTextHandler = (value) => {
    setBookSearchTxt(value)
  }

  const authorNameHandler = (name) => {
    let authorData = authorsList.find((ele) => (ele.name + " " + ele.surname) === name)
    setAuthorId(authorData?.id ?? "");
  }

  const getAuthorsList = async () => {
    try {
      const { data } = await axiosIns.get('/authors')
      setAuthorsList(data);
    } catch (err) {
      setAuthorsList([]);
    }
  }

  useEffect(() => {
    getAuthorsList();
  }, [])

  useEffect(() => {
    if (debounceIntervalId) {
      clearInterval(debounceIntervalId);
      debounceIntervalId = null;
    }

    debounceIntervalId = setTimeout(() => {
      getBooksData(bookSearchTxt, authorId)
    }, 500)
  }, [bookSearchTxt, authorId])

  return (
    <div className={styles.cont}>
      <span>Search by:</span>
      <label>
        <span>Name:&nbsp;</span>
        <input
          type="text"
          onChange={(e) => searchTextHandler(e.target.value)}
          placeholder="Enter Full Name (case sensitive)"
          className={styles.nameInput}
        />
      </label>

      <label>
        <span>Author:&nbsp;</span>
        <input list="authors" placeholder="Enter or Select Author" onChange={(e) => authorNameHandler(e.target.value)} className={styles.nameInput} />
      </label>
      <datalist id="authors">
        {authorsList.map((author) => (
          <option key={author.id} value={author.name + " " + author.surname} />
        ))}
      </datalist>
    </div>
  )
}

export default BookFilter;