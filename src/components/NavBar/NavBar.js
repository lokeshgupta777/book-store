import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useCart } from "../../providers/cart"

const NavBar = () => {

  const { booksInCart } = useCart()

  return (
    <nav className={styles.cont}>
      <Link to={"/"}>Home</Link>
      <Link to={"/books"}>Books</Link>
      <Link to={"/authors"}>Authors</Link>
      <Link to={"/checkout"}>
        <div>
          <span>Checkout</span>
          <span style={{ marginLeft: '5px' }}>{booksInCart?.length}</span>
        </div>
      </Link>
    </nav>
  )
}

export default NavBar

