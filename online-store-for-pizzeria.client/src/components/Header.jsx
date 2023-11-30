import "../styles/Header.css";
import logo from "../image/logo.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import CartBtn from "./buttons/CartBtn";
import Login from "./buttons/Login";
import Signup from "./buttons/Signup";

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
      {/* <div className='search-container'>
                <input className='search' type='text' placeholder="Найти пиццу" onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} />
            </div>             */}
      <div className="cart-header">
        <Link className="cart-header-a" to="/cartModal">
          Корзина
        </Link>
      </div>
      <CartBtn />
      <Login />
      <Signup />
      <div className="profile-header">
        <Link className="profile-header-a" to="/profile">
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default Header;
