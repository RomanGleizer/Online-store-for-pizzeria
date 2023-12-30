import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";
import pizFoCh from "../image/pizFourCheese.jpg";
import pep from "../image/pep.jpg";
import karbo from "../image/karbo.jpg";
import sez from "../image/sez.jpg";
import vetch from "../image/vetch.jpg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/Cart.css"

const Cart = () => {
  let images = [sez, vetch, karbo, pizFoCh, pep];

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
    if (confirm("Точно удалить всё из корзины?")) {
      dispatch(clearCart());
      console.log(cart);
    }
  };
  return (
    <div className="cart-container">
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>В корзине пока пусто :(</p>
          <p>Не заставляйте Дака злиться...</p>
          <div className="start-shopping">
            <Link to="/">
              <span>Нажимай и начнём покупки!</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-not-empty">
          <div>
          <div className="continue-shopping">
            <Link to="/">
              <span>Продолжить выбирать товары</span>
            </Link>
          </div>
          <div className="all-info">
            {cart.cartTotalQuantity} товаров на сумму {cart.cartTotalAmount}{" "}
            рублей
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <img
                    className="cart-image"
                    src={images[cartItem.id - 1]}
                    alt={cartItem.title}
                  />
<div className="cart-item-info">
                  <h3 className="title-item">{cartItem.title}</h3>                  
                  <div className="cart-product-price">{cartItem.price}р.</div>
                  <button
                    className="del-item"
                    onClick={() => handleRemoveFromCart(cartItem)}
                  >
                    Удалить
                  </button>
                  
                  <div className="count-div">
                    <button
                      className="minus"
                      onClick={() => handleDecreaseCart(cartItem)}
                    >
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button
                      className="plus"
                      onClick={() => handleAddToCart(cartItem)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.price * cartItem.cartQuantity}р.
                  </div>
                  </div>
                </div>
              ))}
          </div>
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Очистить корзину
            </button>
            <div className="subtotal">
              <div className="span-total">Сумма заказа:</div>
              <div className="amount">{cart.cartTotalAmount}р.</div>
            </div>
            <div className="payment">
              <NavLink to="/payment" className="payment-btn">
                К оформлению заказа
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
