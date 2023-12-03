import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delItem } from "../redux/actions/index";
import { NavLink } from "react-router-dom";
import pizFoCh from '../image/pizFourCheese.jpg';

const Cart = () => {
    let images = [pizFoCh, pizFoCh, pizFoCh, pizFoCh, pizFoCh];
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-del"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={images[cartItem.id]}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">${cartItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="row">
        <h3>В корзине пока пусто</h3>
        <p>Не заставляйте Дака злиться...</p>
      </div>
    );
  };

  const button = () => {
    return (
      <div className="container">
        <div className="row">
          <NavLink to="/payment" className="Payment">
            К оформлению заказа
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && button()}
    </>
  );
};

export default Cart;
