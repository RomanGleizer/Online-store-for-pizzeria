import "./styles/Payment.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTotals } from "./slices/cartSlice";

function Payment() {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const { cartTotalAmount } = useSelector((state) => state.cart);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const [isCard, setIsCardSelected] = useState("cash");

    const handleCardChange = (event) => {
        setIsCardSelected(event.target.value);
    };

    const [isDelivery, setIsDeliverySelected] = useState("pickUp");

    const handleDeliveryChange = (event) => {
        setIsDeliverySelected(event.target.value);
    };

    const handleOrderSend = async () => {
        const order = {
            id: Date.now(),
            totalPrice: cartTotalAmount,
            deliveryType: isDelivery,
            adress: "",
            paymentType: isCard,
            customerId: 0,
            pizzas: cart.cartItems,
        };

        try {
            const response = await fetch("https://localhost:7106/api/orders", {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Date.now(),
                    totalPrice: cartTotalAmount,
                    deliveryType: isDelivery,
                    adress: "",
                    paymentType: isCard,
                    customerId: 0,
                    pizzas: cart.cartItems,
                }),
            });
        } catch (error) {
            console.error("Произошла ошибка:", error.message);
        }
    };

    return (
        <div className="payment-cont">
            <div className="about-customer">
                <h4 className="order-title">Оформление заказа</h4>
                <div className="div-cust">
                    <div className="name option between">
                        <span className="main-span">Имя</span>
                        <input className="no-radio" type="text" placeholder="Ваше имя" required />
                    </div>

                    <div className="phone option between">
                        <span className="main-span">Номер телефона</span>
                        <input
                            className="no-radio"
                            type="phone"
                            placeholder="+79000000000"
                            required
                        />
                    </div>

                    <h4 className="main-span">Тип доставки</h4>

                    <div className="delivery-type">
                        <div className="deliv option">
                            <p>Выберите:</p>
                            <ul>
                                <li>
                                    <input
                                        className="radio"
                                        type="radio"
                                        name="deliveryGroup"
                                        value="delivery"
                                        onChange={handleDeliveryChange}
                                    />{" "}
                                    <span className="radio-span">Доставка</span>
                                </li>
                                <li>
                                    <input
                                        className="radio"
                                        type="radio"
                                        name="deliveryGroup"
                                        value="pickUp"
                                        onChange={handleDeliveryChange}
                                    />{" "}
                                    <span className="radio-span">Самовывоз</span>
                                </li>
                            </ul>
                        </div>

                        <div className="adress-div option between">
                            <span className="p-card">Адрес доставки</span>
                            <input
                                className="no-radio"
                                type="text"
                                placeholder="Малышева 32"
                                required={isDelivery}
                            />
                        </div>

                        <br />
                    </div>
                </div>

                <h4 className="main-span">Оплата</h4>

                <div className="payment-type option">
                    <p>Выберите:</p>
                    <ul>
                        <li>
                            <input
                                className="radio"
                                type="radio"
                                name="radioGroup"
                                value="card"
                                onChange={handleCardChange}
                            />{" "}
                            <span className="radio-span">По карте</span>
                        </li>
                        <li>
                            <input
                                className="radio"
                                type="radio"
                                name="radioGroup"
                                value="cash"
                                onChange={handleCardChange}
                            />{" "}
                            <span className="radio-span">Наличные</span>
                        </li>
                    </ul>
                    <div className="card-details option">
                        <ul>
                            <li className="between">
                                <span className="p-card">Номер карты:</span>
                                <input className="no-radio" type="text" required={isCard} />
                            </li>
                            <li className="between">
                                <span className="p-card">Дата:</span>
                                <input className="no-radio" type="text" required={isCard} />
                            </li>
                            <li className="between">
                                <span className="p-card">CCV:</span>
                                <input className="no-radio" type="text" required={isCard} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="input-promo option">
                    <p className="main-span">Промокод</p>
                    <input type="text" className="no-radio" placeholder="Введите промокод" />
                    <button type="submit" className="btn-promo">
                        Применить
                    </button>
                </div>
            </div>

            <div className="p-cart-cont">
                <ul className="p-items-cart">
                    <li>
                        <div className="order-name">Заказ</div>
                        <div className="create-line"></div>
                    </li>
                    {cart.cartItems &&
                        cart.cartItems.map((cartItem) => (
                            <div className="p-cart-item" key={cartItem.id}>
                                <div className="p-cart-product">
                                    <h3 className="p-title">{cartItem.title}</h3>
                                    <p className="p-price">{cartItem.price}р.</p>
                                </div>

                                <div className="p-count">х{cartItem.cartQuantity}</div>

                                <div className="p-cart-product-total-price">
                                    {cartItem.price * cartItem.cartQuantity}р.
                                </div>
                            </div>
                        ))}

                    <li>
                        <div className="create-line"></div>
                    </li>

                    <li className="p-delivery between">
                        <span className="p-total-span">Доставка</span>
                        <strong className="p-total-price">Бесплатно</strong>
                    </li>

                    <li className="p-total-amount between">
                        <span className="p-total-span">{cartTotalQuantity} товар</span>
                        <strong className="p-total-price">{cartTotalAmount}р.</strong>
                    </li>

                    <li>
                        <div className="create-line"></div>
                    </li>

                    <li className="p-total-amount between">
                        <span className="p-total-span">Сумма заказа</span>
                        <strong className="p-total-price">{cartTotalAmount}р.</strong>
                    </li>
                </ul>
                <button className="p-order" onClick={handleOrderSend}>
                    Оформить заказ
                </button>
            </div>
        </div>
    );
}

export default Payment;
