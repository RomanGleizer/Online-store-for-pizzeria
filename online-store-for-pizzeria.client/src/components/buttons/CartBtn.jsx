import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartBtn = () => {

    const { cartTotalQuantity } = useSelector((state) => state.cart);
    
    return (
        <>
            <NavLink to="/cart" className="btn">
                <span className="fa fa-shopping-cart me-1">Cart ({cartTotalQuantity})</span> 
            </NavLink>
        </>
    )
}

export default CartBtn;
