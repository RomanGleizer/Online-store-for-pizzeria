import React from "react";

import { NavLink } from "react-router-dom";

const LoginBtn = () => {
  const isLogin = true;
  const myRoot = isLogin ? "/profile" : "/login";

  return (
    <NavLink to={myRoot} className="btn">
      <span className="btn-log">Личный кабинет</span>
    </NavLink>
  );
};

export default LoginBtn;
