import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartBtn = () => {

    const state = useSelector((state)=> state.addItem)
    
    return (
        <>
            <NavLink to="/cart" className="btn">
                <span className="fa fa-shopping-cart me-1">Cart ({state.length})</span> 
            </NavLink>
        </>
    )
}

export default CartBtn;
