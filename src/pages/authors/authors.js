import { useEffect, useState } from "react";
import axiosIns from "../../config/axios";
import Author from "../../components/Author/Author";
import styles from "./authors.module.css"

const Authors = () => {

  const [authorsList, setAuthorsList] = useState(null);

  const getAuthorsList = async () => {
    try {
      const { data } = await axiosIns.get('/authors');
      setAuthorsList(data);
    } catch (err) {
      console.log(err)
      setAuthorsList(null);
    }
  }

  useEffect(() => {
    getAuthorsList();
  }, [])

  return (
    <div className={styles.cont}>
      <h1>Authors</h1>
      <div >
        {authorsList?.map((authorData) => {
          return (
            <Author
              key={authorData.id}
              authorData={authorData}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Authors;