import { Link } from "react-router-dom";
import styles from "./Author.module.css"

const Author = ({ authorData }) => {
  return (
    <Link to={`/books?author_id=${authorData.id}`} className={styles.cont}>
      <img src={authorData.image} height={200} width={200} />
      <span>{authorData.name + " " + authorData.surname}</span>
    </Link>
  )
}

export default Author;