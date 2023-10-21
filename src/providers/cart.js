import { useEffect, useState } from "react"
import { getCookie } from "../utils/getCookie";
import axiosIns from "../config/axios";
import React from "react";

const CartContext = React.createContext({
  booksInCart: [],
  userData: null,
  showLogin: false,
  addBooksToCart: () => { },
  removeBookFromCart: () => { },
  isBookInCart: () => { },
  logout: () => { },
  setUserName: () => { },
  setUserPass: () => { },
  setShowLogin: () => { },
})

const CartProvider = ({ children }) => {
  const [booksInCart, setBooksInCart] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userData, setUserData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const getUserData = async (returnUser) => {
    const { data } = await axiosIns.get(`/users?user_name=${userName}&user_pass=${userPass}`);
    setUserData(data?.length ? data[0] : null);
    if (returnUser)
      return (data?.length ? data[0] : null);
  }

  const fetchCartBooksDetails = async (user) => {
    try {
      const cartBooks = await Promise.all(user?.books_in_cart?.map((bookId) => axiosIns.get(`/book_details?book_id=${bookId}`).then(({ data }) => data[0])));
      setBooksInCart(cartBooks);
    } catch (err) {
      console.log(err);
      setBooksInCart([]);
    }
  }

  const addBooksToCart = async (booksIdsArr, bookDetails) => {
    if (userData?.id) {
      let newBooksIdsObj = {}

      booksIdsArr.forEach((bookId) => {
        newBooksIdsObj[bookId] = true;
      })

      booksInCart.forEach((bookData) => {
        newBooksIdsObj[bookData?.book_id] = true;
      })

      let newBooksIds = Object.keys(newBooksIdsObj).map((key) => Number(key));

      await axiosIns({
        method: 'patch',
        url: `/users/${userData?.id}`,
        data: {
          books_in_cart: [...newBooksIds]
        },
      })

      const user = await getUserData(true);
      await fetchCartBooksDetails(user);
    } else {
      if (!booksInCart.some((bookData) => bookData?.book_id === bookDetails?.book_id))
        setBooksInCart([bookDetails, ...booksInCart])
    }
  }

  const removeBookFromCart = async (bookId) => {
    if (userData?.id) {
      let newBooksIds = userData?.books_in_cart?.filter((book_id) => book_id !== bookId);
      await axiosIns({
        method: 'post',
        url: `/users/${userData?.id}`,
        data: {
          books_in_cart: [...newBooksIds]
        },
      })

      const user = await getUserData(true);
      await fetchCartBooksDetails(user);
    } else {
      let filteredBooks = booksInCart.filter((bookData) => bookData?.book_id !== bookId);
      setBooksInCart(filteredBooks);
    }
  }

  const isBookInCart = (bookId) => {
    if (booksInCart.some((bookData) => bookData?.book_id === bookId))
      return true;
    return false;
  }

  const logout = () => {
    setUserData(null);
    setUserName("");
    setUserPass("");
    setBooksInCart([]);
    document.cookie=`user_name=${userName}; path=/; max-age=0`
    document.cookie=`user_pass=${userPass}; path=/; max-age=0`
  }

  useEffect(() => {
    setUserName(getCookie('user_name'));
    setUserPass(getCookie('user_pass'));
  }, [])

  useEffect(() => {
    userName && userPass && getUserData();
  }, [userName, userPass])

  useEffect(() => {
    if (userData?.id) {
      if (booksInCart?.length) {
        addBooksToCart([userData?.books_in_cart ?? []])
      } else {
        fetchCartBooksDetails(userData)
      }
    }
  }, [userData?.id])

  return (
    <CartContext.Provider
      value={{
        booksInCart,
        userData,
        showLogin,
        addBooksToCart,
        removeBookFromCart,
        isBookInCart,
        logout,
        setUserName,
        setUserPass,
        setShowLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;

export const useCart = () => React.useContext(CartContext);