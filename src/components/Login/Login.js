import { useEffect, useState } from "react";
import { useCart } from "../../providers/cart";
import axiosIns from "../../config/axios";
import styles from "./Login.module.css"

const Login = () => {

  const { setUserName, setUserPass, showLogin, setShowLogin } = useCart();

  const [mode, setMode] = useState("login");
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

  const getRandomId = () => {
    let random = 0;
    while (!((random >= 1) && (random <= 100000))) {
      random = Math.random() * 100000;
    }
    return Math.floor(random)
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      let userData = null;
      if (mode === 'login') {
        const { data } = await axiosIns.get(`/users?user_name=${typedUserName}&user_pass=${typedUserPass}`);
        userData = data
      } else {
        let newId = getRandomId();
        const { data } = await axiosIns({
          method: "post",
          url: `/users`,
          data: {
            id: newId,
            user_name: typedUserName,
            user_pass: typedUserPass,
          },
        })
        userData = data
      }

      if (userData?.length && userData[0]?.id) {
        setUserName(userData[0]?.user_name)
        setUserPass(userData[0]?.user_pass)
        document.cookie = `user_name=${userData[0]?.user_name}; path=/; max-age=86400`
        document.cookie = `user_pass=${userData[0]?.user_pass}; path=/; max-age=86400`
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

  const modeToggleHandler = () => {
    if (mode === 'login') {
      setMode('sign up');
      setTypedUserName("");
      setTypedUserPass("");
    }
    else
      setMode('login')
    setErrorMsg("");
  }

  return (
    <dialog id="login-modal">
      <form onSubmit={loginHandler} className={styles.form} autoComplete="off">
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
        <button type="submit" className={styles.button}>{mode}</button>
      </form>
      <p
        onClick={modeToggleHandler}
        className={styles.mode}
      >
        {mode === 'login' ? "Sign Up" : "Login"}
      </p>
    </dialog>
  )
}

export default Login;