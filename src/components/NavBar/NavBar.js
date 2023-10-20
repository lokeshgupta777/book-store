import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

const NavBar = () => {
    return (
        <nav className={styles.cont}>
            <Link to={"/"}>Home</Link>
            <Link to={"/books"}>Books</Link>
            <Link to={"/authors"}>Authors</Link>
            <Link to={"/checkout"}>Checkout</Link>
        </nav>
    )
}

export default NavBar

