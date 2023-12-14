import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LoginBtn = () => {
  const {isLogined} = useSelector((state) => state.user);
  const savedLogined = JSON.parse(localStorage.getItem("isLogined"));
  const myRoot = savedLogined ? "/profile" : "/login";

  return (
    <NavLink to={myRoot} className="btn">
      <span className="btn-log"> Личный кабинет </span>
    </NavLink>
  );
};

export default LoginBtn;
