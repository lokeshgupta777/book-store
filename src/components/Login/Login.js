import { useEffect, useState } from "react";
import { useCart } from "../../providers/cart";
import axiosIns from "../../config/axios";
import styles from "./Login.module.css"

const Login = () => {

  const { setUserName, setUserPass, showLogin, setShowLogin } = useCart();

  const [typedUserName, setTypedUserName] = useState("");
  const [typedUserPass, setTypedUserPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let dialogEle = document.getElementById("login-modal");
    if (showLogin) {
      dialogEle.showModal();
    } else {
      dialogEle.close();
      setTypedUserName("");
      setTypedUserPass("");
    }
  }, [showLogin])

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosIns.get(`/users?user_name=${typedUserName}&user_pass=${typedUserPass}`);
      if (data?.length && data[0]?.id) {
        setUserName(data[0]?.user_name)
        setUserPass(data[0]?.user_pass)
        document.cookie = `user_name=${data[0]?.user_name}; path=/; max-age=86400`
        document.cookie = `user_pass=${data[0]?.user_pass}; path=/; max-age=86400`
        setShowLogin(false);
      } else {
        setErrorMsg("UserName or password incorrect!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const typedUserNameHandler = (value) => {
    setTypedUserName(value)
    setErrorMsg("");
  }

  const typedUserPassHandler = (value) => {
    setTypedUserPass(value)
    setErrorMsg("")
  }

  return (
    <dialog id="login-modal">
      <form onSubmit={loginHandler} className={styles.form}>
        <div className={styles.inputCont}>
          <span>Username:</span>
          <input
            type="text"
            value={typedUserName}
            onChange={(e) => typedUserNameHandler(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputCont}>
          <span>Password:</span>
          <input
            type="password"
            value={typedUserPass}
            onChange={(e) => typedUserPassHandler(e.target.value)}
            className={styles.input}
          />
        </div>
        {errorMsg && <p className={styles.errMsg}>{errorMsg}</p>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </dialog>
  )
}

export default Login;