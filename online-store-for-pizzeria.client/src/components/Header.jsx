import "../styles/Header.css";
import logo from "../image/logo.svg";
import { Link } from "react-router-dom";
import CartBtn from "./buttons/CartBtn";
import LoginBtn from "./buttons/LoginBtn";

function Header() {

  return (
    <header className="header">
      <div className="flex">
        <div className="logo">
          <Link to="/">
            {" "}
            <img
              className="logo-main"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="header-buttons">
          <div className="cart-header">
            <CartBtn />
          </div>
          <div className="profile-header">
            <LoginBtn />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
