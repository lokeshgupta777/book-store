import { useCart } from "../../providers/cart"
import styles from "./CheckoutBook.module.css"

const CheckoutBook = ({ bookData }) => {

  const { removeBookFromCart } = useCart();

  const removeBookHandler = () => {
    removeBookFromCart(bookData?.book_id)
  }

  return (
    <div className={styles.book}>
      <img src={bookData?.cover_image} />
      <div className={styles.bookInfo}>
        <span>{bookData?.title}</span>
        <span>{bookData?.author_name + " " + bookData?.author_surname}</span>
        <span>Year:&nbsp;&nbsp;&nbsp;&nbsp;{bookData?.releaseDate}</span>
        <span>Pages:&nbsp;{bookData?.pages}</span>
        <span>ISBN:&nbsp;&nbsp;&nbsp;{bookData?.isbn}</span>
      </div>
      <div className={styles.bookPriceAndRemove}>
        <span>Rs. {bookData?.price}</span>
        <button onClick={removeBookHandler}>Remove</button>
      </div>
    </div>
  )
}

export default CheckoutBook;