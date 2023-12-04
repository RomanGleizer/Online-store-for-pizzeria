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
        <h4 className="order-title">Оформление заказа</h4>
        <div className="div-cust">
          <div className="name">
            <span>Имя</span>
            <input type="text" placeholder="Ваше имя" required />
          </div>

          <div className="phone">
            <span>Номер телефона</span>
            <input type="phone" placeholder="+79000000000" required />
          </div>

          <h4 className="h-pay">Тип доставки</h4>

          <div className="delivery-type">
            <div className="deliv">
              <p>Выберите:</p>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="deliveryGroup"
                    value="delivery"
                    onChange={handleDeliveryChange}
                  />{" "}
                  <span>Доставка</span>
                </li>
                <li>
                  <input
                    className="left"
                    type="radio"
                    name="deliveryGroup"
                    value="pickUp"
                    onChange={handleDeliveryChange}
                  />{" "}
                  <span>Самовывоз</span>
                </li>
              </ul>
            </div>

            <div className="adress-div">
              <span>Адрес доставки</span>
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
          <p>Выберите:</p>
          <ul>
            <li>
              <input
                type="radio"
                name="radioGroup"
                value="card"
                onChange={handleCardChange}
              />{" "}
              <span>По карте</span>
            </li>
            <li>
              <input
                type="radio"
                name="radioGroup"
                value="cash"
                onChange={handleCardChange}
              />{" "}
              <span>Наличные</span>
            </li>
          </ul>
          <div className="card-details">
            <span>Номер карты:</span>
            <input type="text" required={isCard} />
            <span>Дата:</span>
            <input type="text" required={isCard} />
            <span>CCV:</span>
            <input type="text" required={isCard} />
          </div>
        </div>
        <div className="input-promo">
          <p>Промокод</p>
          <input type="text" className="promo" placeholder="Введите промокод" />
          <button type="submit" className="btn-promo">
            Применить
          </button>
        </div>
      </div>

      <div className="cart-cont">
        <ul className="items-cart">
          {cart.cartItems &&
            cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.price}р.</p>
                  </div>
                </div>

                <div className="count">{cartItem.cartQuantity}</div>

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
