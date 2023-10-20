import { useLoaderData } from "react-router-dom";
import Featured from "../../components/HomePage/Featured";
import { useEffect } from "react";
import styles from "./home.module.css"

const HomePage = () => {
  return (
    <div className={styles.cont}>
      <p>Welcome to My Book Store</p>
      <Featured />
    </div>
  )
}

export default HomePage;