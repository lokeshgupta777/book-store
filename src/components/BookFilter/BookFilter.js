import { useEffect, useState } from "react"
import axiosIns from "../../config/axios";
import styles from "./BookFilter.module.css"

let debounceIntervalId = null;

const BookFilter = ({ searchParams, setSearchParams }) => {

  const [bookSearchTxt, setBookSearchTxt] = useState(searchParams.get('title') ?? "");
  const [authorId, setAuthorId] = useState(searchParams.get('author_id') ?? "");
  const [authorName, setAuthorName] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const searchTextHandler = (value) => {
    setBookSearchTxt(value)
  }

  const authorNameHandler = (name) => {
    let authorData = authorsList.find((ele) => (ele.name + " " + ele.surname) === name)
    setAuthorId(authorData?.id ?? "");
    setAuthorName(name);
  }

  const getAuthorsList = async () => {
    try {
      const { data } = await axiosIns.get('/authors')
      const authorData = data.find((ele) => (ele.id) == authorId)
      authorData && setAuthorName(authorData?.name + " " + authorData?.surname);
      setAuthorsList(data);
    } catch (err) {
      setAuthorsList([]);
    }
  }

  useEffect(() => {
    getAuthorsList();
  }, [])

  useEffect(() => {
    if (!searchParams?.get('title'))
      setBookSearchTxt("");
    if (!searchParams?.get('author_id')) {
      setAuthorId("")
      setAuthorName("")
    }
  }, [searchParams])

  useEffect(() => {
    if (debounceIntervalId) {
      clearInterval(debounceIntervalId);
      debounceIntervalId = null;
    }

    if (initialized) {
      debounceIntervalId = setTimeout(() => {
        setSearchParams({
          title: bookSearchTxt,
          author_id: authorId
        })
      }, 500)
    } else {
      setInitialized(true);
    }
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
          value={bookSearchTxt}
        />
      </label>

      <label>
        <span>Author:&nbsp;</span>
        <input list="authors" placeholder="Enter or Select Author" onChange={(e) => authorNameHandler(e.target.value)} className={styles.nameInput} value={authorName} />
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