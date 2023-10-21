import CheckoutBook from "../../components/CheckoutBook/CheckourBook";
import CheckoutPrice from "../../components/CheckoutPrice/CheckoutPrice";
import { useCart } from "../../providers/cart"
import styles from "./checkout.module.css"

const Checkout = () => {
  const { booksInCart } = useCart();

  return (
    <div className={styles.cont}>
      {booksInCart?.length ? (
        <>
          <div className={styles.cartBooksCont}>
            {booksInCart?.map((bookData) => (
              <CheckoutBook key={bookData?.book_id} bookData={bookData} />
            ))}
          </div>
          <CheckoutPrice />
        </>
      ) : (
        <p>No Books In Cart!</p>
      )}
    </div>
  )
}

export default Checkout;