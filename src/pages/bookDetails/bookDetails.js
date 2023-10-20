import { useEffect, useState } from "react";
import styles from "./bookDetails.module.css"
import { useNavigate, useParams } from "react-router-dom";
import axiosIns from "../../config/axios";
import { useCart } from "../../providers/cart";

const BookDetails = () => {

  const params = useParams();
  const navigate = useNavigate();
  const { addBooksToCart, isBookInCart } = useCart();
  const [bookData, setBookData] = useState(undefined);

  const fetchBookData = async () => {
    try {
      const { data } = await axiosIns.get(`book_details?book_id=${params?.bookId}`);
      setBookData(data?.length && data[0]);
    } catch (err) {
      console.log(err);
      setBookData(null);
    }
  }

  useEffect(() => {
    if (params?.bookId)
      fetchBookData();
  }, [params])

  const buyBookHandler = () => {
    if (isBookInCart(bookData?.book_id)) {
      navigate('/checkout')
    } else {
      addBooksToCart([bookData?.book_id])
    }
  }

  if (!params?.bookId)
    return null;

  return (
    <>
      {bookData ? (
        <div className={styles.cont}>
          <img src={bookData.cover_image} height={'auto'} width={'300px'} />
          <div className={styles.bookDetailsCont}>
            <div className={styles.bookDetails}>
              <span>Title:&nbsp;</span>
              <span>{bookData.title}</span>
            </div>
            <div className={styles.bookDetails}>
              <span>Author:&nbsp;</span>
              <span>{bookData.author_name + " " + bookData.author_surname}</span>
            </div>
            <div className={styles.bookDetails}>
              <span>Description:&nbsp;</span>
              <span>{bookData.desc}</span>
            </div>
            <div className={styles.bookDetails}>
              <span>Release Date:&nbsp;</span>
              <span>{bookData.releaseDate}</span>
            </div>
            <div className={styles.bookDetails}>
              <span>Pages:&nbsp;</span>
              <span>{bookData.pages}</span>
            </div>
            <div className={styles.bookDetails}>
              <span>ISBN:&nbsp;</span>
              <span>{bookData.isbn}</span>
            </div>
            <button className={styles.bookButton} onClick={buyBookHandler}>{isBookInCart(bookData?.book_id) ? "Go To Cart" : "Add To Cart"} </button>
          </div>
        </div>
      ) : (
        (bookData === null) ? <p>"There seems to be error!!"</p> : ""
      )}
    </>
  )
}

export default BookDetails;