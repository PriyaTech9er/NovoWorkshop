import React, { useState, useEffect } from 'react';
import { useCookies, withCookies, Cookies } from "react-cookie";

import style from './styles.scss'

const Header = ({props}) => {
  // const cookies = Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["userLogin"]);
  const [isCookieAvailability, setCookieAvailability] = useState(false);

  useEffect(() => {
    const cookieData = cookies.userLogin || null
    if(cookieData) {
      setCookieAvailability(true)
    } else {
      setCookieAvailability(false)
    }
  }, [])

  function handleCookie() {
    setCookie("userLogin", "login12345678", {
      path: "/"
    });
    location.reload();
  }

  const handleRemoveCookie = () => {
    removeCookie("userLogin")
    location.reload();
  }

  return (
    <div className={style.headerContainer}>
      <div className={style.headerSection}>Header Section</div>
      {!isCookieAvailability ? (
        <button onClick={handleCookie} className={style.cookieButton}>Set Cookie</button>
      ) : (
        <button onClick={handleRemoveCookie} className={style.cookieButton}>Remove Cookie</button>
      )}
     </div>
  )
}

export default withCookies(Header);
