import "../styles/Header.css";
import logo from "../image/logo.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import CartBtn from "./buttons/CartBtn";
import Login from "./buttons/LoginBtn";
import Signup from "./buttons/RegisterBtn";

function Header() {

const isLogin = false;
const rootLogin = <Login />

// if (isLogin) {
//   rootLogin = <Login />
// }
// else {
//   rootLogin = <Profile />;
// }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          {" "}
          <img
            className="logo-main"
            src={logo}
            alt="logo"
            width={329}
            height={100}
          />
        </Link>
      </div>
      <div className="cart-header">
        <CartBtn />
      </div>
      <Signup />
      <div className="profile-header">
        {rootLogin}
        {/* <Link className="profile-header-a" to={rootLogin}>
          Личный кабинет
        </Link> */}
      </div>
    </header>
  );
}

export default Header;
