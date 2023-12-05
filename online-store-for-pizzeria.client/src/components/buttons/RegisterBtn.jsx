import React from 'react'
import { NavLink } from 'react-router-dom'

const RegisterBtn = () => {
    return (
        <NavLink to="/register" className="btn">
        <span className="btn-reg">Регистрация</span> 
      </NavLink>
    )
}

export default RegisterBtn;
