import { useCart } from "../../providers/cart";
import styles from "./CheckoutPrice.module.css"

const CheckoutPrice = () => {

  const { booksInCart } = useCart();

  const getTotalPrice = () => {
    let totalPrice = 0;
    booksInCart?.forEach((book) => {
      totalPrice += Number(book?.price)
    })
    return totalPrice;
  }

  return (
    <div className={styles.cont}>
      <span>Total Price:</span>
      <span>{getTotalPrice()}</span>
    </div>
  )
}

export default CheckoutPrice;