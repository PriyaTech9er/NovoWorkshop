import React, { useState, useEffect } from 'react';
import { useCookies, withCookies, Cookies } from "react-cookie";

import style from './styles.scss'

const Header = ({props}) => {
  // const cookies = Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["userLogin"]);
  const [isCookieAvailability, setCookieAvailability] = useState(false);
  const [isIframePage, setisIframePage] = useState(false);

  useEffect(() => {

    if (window.location !== window.parent.location ) {
      setisIframePage(true)
    } else {
      setisIframePage(false)
      console.log("it is not in iframe")
    }

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

  console.log("cookies.userLogin", cookies.userLogin)

  return (
    <div className={style.headerContainer}>
      <div className={style.headerSection}>Header Section</div>
      {
        !isIframePage ? (
          <div>
            <div>This site is not in iframe</div>
              {
                isCookieAvailability ? (
                  <div>Cookie is available - {cookies.userLogin}</div>
                ): (
                  <div>Cookie is not available</div>
                )
              }
            {
              !isCookieAvailability ? (
                <button onClick={handleCookie} className={style.cookieButton}>Set Cookie</button>
              ) : (
                <button onClick={handleRemoveCookie} className={style.cookieButton}>Remove Cookie</button>
              )
            }
          </div>
        ) : (
          <>
            <div>This site is in iframe</div>
            {isCookieAvailability ? (
                <div>Cookie is available - {cookies.userLogin}</div>
              ): (
                <div>Cookie is not available</div>
              )
            }
          </>
        )
      }
     </div>
  )
}

export default withCookies(Header);
