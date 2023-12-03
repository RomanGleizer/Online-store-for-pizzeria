import React from "react";
import "../../styles/Modal.css";

import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <NavLink to="/profile" className="btn">
      <span className="fa fa-shopping-cart me-1">Login</span> 
    </NavLink>
  );
};

export default Login;
