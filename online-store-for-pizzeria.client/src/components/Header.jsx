import "../styles/Header.css";
import logo from "../image/logo.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import CartBtn from "./buttons/CartBtn";
import Login from "./buttons/LoginBtn";
import LoginBtn from "./buttons/LoginBtn";

function Header() {

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
      <div className="profile-header">
      <LoginBtn />
      </div>
    </header>
  );
}

export default Header;
