import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.cont}>
      <h1 className={styles.head}>Book Store App</h1>
      <p className={styles.login}>Login</p>
    </header>
  )
}

export default Header