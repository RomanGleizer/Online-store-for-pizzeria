import "./styles/Payment.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "./slices/cartSlice";

function Payment() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { cartTotalAmount } = useSelector((state) => state.cart);
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

  const [isCard, setIsCardSelected] = useState(false);

  const handleCardChange = (event) => {
    setIsCardSelected(event.target.value === "card");
  };

  const [isDelivery, setIsDeliverySelected] = useState(false);

  const handleDeliveryChange = (event) => {
    setIsDeliverySelected(event.target.value === "delivery");
  };

  

  return (
    <div className="payment">
      <div className="about-customer">
        <h4 className="order">Оформление заказа</h4>
        <form className="form-cust">
          <div className="div-cust">
            <div className="name">
              <label className="label">Имя</label>
              <input type="text" placeholder="Ваше имя" required />
            </div>

            <div className="phone">
              <label className="label">Номер телефона</label>
              <input type="phone" placeholder="+79000000000" required />
            </div>

            <h4 className="h-pay">Оплата</h4>

            <div className="payment-type">
              <label>
                Выберите:
                <input
                  type="radio"
                  name="deliveryGroup"
                  value="delivery"
                  onChange={handleDeliveryChange}
                />{" "}
                Доставка
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryGroup"
                  value="pickUp"
                  onChange={handleDeliveryChange}
                />{" "}
                Самовывоз
              </label>

              <br />

              <div className="adress-div">
                <label className="adress">Адрес доставки</label>
                <input
                  type="text"
                  className="adress"
                  placeholder="Малышева 32"
                  required={isDelivery}
                />
              </div>

              <br />
            </div>
          </div>

          <h4 className="h-pay">Оплата</h4>

          <div className="payment-type">
            <label>
              Выберите:
              <input
                type="radio"
                name="radioGroup"
                value="card"
                onChange={handleCardChange}
              />{" "}
              По карте
            </label>
            <label>
              <input
                type="radio"
                name="radioGroup"
                value="cash"
                onChange={handleCardChange}
              />{" "}
              Наличные
            </label>

            <br />
            <div className="card-details">
              <label>
                Номер карты:
                <input type="text" required={isCard} />
              </label>
              <label>
                Дата:
                <input type="text" required={isCard} />
              </label>
              <label>
                CCV:
                <input type="text" required={isCard} />
              </label>
            </div>

            <br />
          </div>
          <form className="form-payment">
            <div className="input-promo">
              <input
                type="text"
                className="promo"
                placeholder="Введите промокод"
              />
              <button type="submit" className="btn-promo">
                Применить
              </button>
            </div>
          </form>
        </form>
      </div>

      <div className="cart-cont">
        <ul className="items-cart">
          {cart.cartItems &&
            cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}

          <li className="total-amount">
            <span>Total (USD)</span>
            <strong>${cartTotalAmount}</strong>
          </li>
        </ul>
        <button className="order" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default Payment;
