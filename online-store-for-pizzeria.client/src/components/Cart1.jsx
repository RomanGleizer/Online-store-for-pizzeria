import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина пуста</p>
          <p>Не заставляйте Дака злиться...</p>
          <div className="start-shopping">
            <Link to="/">              
              <span>На главную страницу</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Удалить
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">{cartItem.price}р.</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.price * cartItem.cartQuantity}р.
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Очистить корзину
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Сумма заказа:</span>
                <span className="amount">{cart.cartTotalAmount}р.</span>
              </div>
              <p>Полный расчет и учет промокодов будет при оформлении заказа</p>
              <NavLink to="/payment" className="Payment">
            К оформлению заказа
          </NavLink>
              <div className="continue-shopping">
                <Link to="/">                  
                  <span>Продолжить заказ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
