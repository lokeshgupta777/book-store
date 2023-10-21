import styles from "./Header.module.css"
import { useCart } from "../../providers/cart"
import { Suspense, useState } from "react";
import { lazy } from 'react';

const LoginComp = lazy(() => import('../Login/Login'));

const Header = () => {

  const { logout, userData, setShowLogin } = useCart();
  const [loginComponentCalled, setLoginCompCalled] = useState(undefined);

  const loginHandler = () => {
    if (userData?.id)
      logout();
    else {
      setShowLogin(true);
      setLoginCompCalled(true);
    }
  }

  return (
    <header className={styles.cont}>
      <h1 className={styles.head}>Book Store App</h1>
      <p className={styles.login} onClick={loginHandler}>{userData?.id ? "Logout" : "Login"}</p>

      {loginComponentCalled &&
        <Suspense fallback={"Loading..."}>
          <LoginComp />
        </Suspense>
      }
    </header>
  )
}

export default Header