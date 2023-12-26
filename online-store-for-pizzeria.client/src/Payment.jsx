import "./styles/Payment.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTotals, clearCart } from "./slices/cartSlice";
import { setFirstName, setPhone } from "./slices/userSlice";
import { useNavigate } from "react-router-dom";

function Payment() {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const { cartTotalAmount } = useSelector((state) => state.cart);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        const savedFirstName = JSON.parse(localStorage.getItem("firstName"));
        const savedPhone = JSON.parse(localStorage.getItem("phone"));
        const savedLogined = JSON.parse(localStorage.getItem("isLogined"));
        const savedUserName = JSON.parse(localStorage.getItem("userName"));

        if (savedFirstName
 && savedLogined) {
            dispatch(setFirstName(savedFirstName
    ));
        }

        if (savedPhone && savedLogined) {
            dispatch(setPhone(savedPhone));
        }
    }, [dispatch]);

    const handleFirstNameChange = (e) => {
        dispatch(setFirstName(e.target.value));
    };

    const handlePhoneChange = (e) => {
        dispatch(setPhone(e.target.value));
    };

    const { firstName } = useSelector((state) => state.user);
    const { phone } = useSelector((state) => state.user);

    const [isCard, setIsCardSelected] = useState("cash");

    const handleCardChange = (event) => {
        setIsCardSelected(event.target.value);
    };

    const [isDelivery, setIsDeliverySelected] = useState("pickUp");

    const handleDeliveryChange = (event) => {
        setIsDeliverySelected(event.target.value);
    };

    const [address, setAddressSelected] = useState("");

    const handleAddressChange = (event) => {
        setAddressSelected(event.target.value);
    };

    const [promocode, setPromocodeSelected] = useState("");

    const handlePromocodeChange = (event) => {
        setPromocodeSelected(event.target.value);
    };

    const [discount, setDiscountSelected] = useState(0);

    const handlePromoSend = (event) => {
        if (promocode == "DUCK21") {
            setDiscountSelected(cartTotalAmount * 0.5);
        } else {
            alert("Данный промокод не активен");
        }
    };

    const handleOrderSend = async () => {        
        
        let pizzas = await JSON.parse(JSON.stringify(cart.cartItems));
        
        let pizzasJson = []

        for (let i = 0; i < pizzas.length; i++) { 
            pizzasJson[i] = {                

                price: pizzas[i].price,
                cartQuantity : pizzas[i].cartQuantity,
                title: pizzas[i].title,
                description: pizzas[i].description,
                ingredients: pizzas[i].ingredients,
                categories: pizzas[i].сategories
            }
          }

        //console.log("pizzajson", pizzasJson)

        console.log(user);

        const orderData = {
            totalPrice: cartTotalAmount - discount,
            paymentType: isCard,
            deliveryType: isDelivery,
            address: address,
            userName: savedUserName,
            pizzas: pizzasJson,
        };

        const requestOptions = await ({
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const response = await fetch("https://localhost:7106/api/orders/create", requestOptions).then(
            (response) => {
                if (response.ok) {
                    navigate("/success");
                    dispatch(clearCart());
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }
        );
    };

    return (
        <div className="payment-cont">
            <div className="about-customer">
                <h4 className="order-title">Оформление заказа</h4>
                <div className="div-cust">
                    <div className="name option between">
                        <span className="main-span">Имя</span>
                        <input
                            className="no-radio"
                            value={firstName}
                            type="text"
                            placeholder="Ваше имя"
                            onChange={handleFirstNameChange}
                            required
                        />
                    </div>

                    <div className="phone option between">
                        <span className="main-span">Номер телефона</span>
                        <input
                            className="no-radio"
                            value={phone}
                            type="phone"
                            placeholder="+79000000000"
                            onChange={handlePhoneChange}
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
                                        checked
                                    />{" "}
                                    <span className="radio-span">Самовывоз</span>
                                </li>
                            </ul>
                        </div>

                        <div className="address-div option between">
                            <span className="p-card">Адрес доставки</span>
                            <input
                                className="no-radio"
                                value={address}
                                type="text"
                                onChange={handleAddressChange}
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
                                checked
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
                    <input
                        type="text"
                        value={promocode}
                        onChange={handlePromocodeChange}
                        className="no-radio"
                        placeholder="Введите промокод"
                    />
                    <button onClick={handlePromoSend} className="btn-promo">
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
                        <span className="p-total-span">Скидка</span>
                        <strong className="p-total-price">{discount}р.</strong>
                    </li>

                    <li className="p-total-amount between">
                        <span className="p-total-span">Сумма заказа</span>
                        <strong className="p-total-price">{cartTotalAmount - discount}р.</strong>
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
