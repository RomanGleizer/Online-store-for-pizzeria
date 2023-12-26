import "./styles/Profile.css";
import logo from "./image/logo.svg";
import visa from "./image/visa.svg";
import { setFirstName, setPhone, clearUser } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./slices/cartSlice";

function Profile() {
    const dispatch = useDispatch();
    
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    // const lastOrder = {
    //     "totalPrice": 22.75,
    //     "paymentType": "Cash",
    //     "deliveryType": "Pickup",
    //     "address": "1 Infinity Loop",
    //     "userId": 2022,
    //     "pizzas": [
    //       {
    //         "title": "Spinach and Feta",
    //         "description": "A Greek-inspired treat",
    //         "ingredients": "Spinach, Feta Cheese, Olives",
    //         "price": 12.75,
    //         "cartQuantity": 1,
    //         "categories": "Vegetarian"
    //       },
    //       {
    //         "title": "Meat Feast",
    //         "description": "For the meat lovers",
    //         "ingredients": "Pepperoni, Sausage, Ham, Beef",
    //         "price": 10.0,
    //         "cartQuantity": 2,
    //         "categories": "Meat Lovers"
    //       }
    //     ]
    //   }

    useEffect(() => {
        const savedFirstName = JSON.parse(localStorage.getItem("firstName"));
        const savedPhone = JSON.parse(localStorage.getItem("phone"));

        if (savedFirstName) {
            dispatch(setFirstName(savedFirstName));
        }

        if (savedPhone) {
            dispatch(setPhone(savedPhone));
        }
    }, [dispatch]);

    const handleFirstNameChange = (e) => {
        dispatch(setFirstName(e.target.value));
    };

    const handlePhoneChange = (e) => {
        dispatch(setPhone(e.target.value));
    };

    const navigate = useNavigate();

    const handleLoginedChange = async () => {
        const requestOptions = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        };

        const response = await fetch("https://localhost:7106/api/users/logout", requestOptions).then(
            (response) => {
                if (response.ok) {
                    navigate("/");
                    dispatch(clearUser());
                    dispatch(clearCart());
                    window.location.reload();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
        );
    };

    // = (e) => {
    //     // dispatch(setLogined(false));
    //     navigate("/");
    //   dispatch(clearUser());
    // };

    const { firstName } = useSelector((state) => state.user);
    const { phone } = useSelector((state) => state.user);

    return (
        <div className="profile-body">
            <div className="about-customer">
                <h1 className="order-title">Личный кабинет</h1>
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
                <div className="profile-notification">
                    <h2 className="profile-notification-h">Смс-рассылки</h2>
                    <div className="notification">
                        <input type="checkbox" className="profile-notification-change"></input>
                        <span className="profile-notification-change">
                            хочу получать смс-рассылки с акциями и промокодами
                        </span>
                    </div>
                </div>

                <button className="profile-exit" onClick={handleLoginedChange}>
                    Выйти
                </button>
            </div>
            <div className="orders">
                {lastOrder ? (
                    <ul className="p-items-cart">
                        <li>
                            <div className="order-name">Заказ</div>
                            <div className="create-line"></div>
                        </li>
                        {lastOrder.pizzas &&
                            lastOrder.pizzas.map((pizza) => (
                                <div className="p-cart-item" key={Math.random()}>
                                    <div className="p-cart-product">
                                        <h3 className="p-title">{pizza.title}</h3>
                                        <p className="p-price">{pizza.price}р.</p>
                                    </div>

                                    <div className="p-count">х{pizza.cartQuantity}</div>

                                    <div className="p-cart-product-total-price">
                                        {pizza.price * pizza.cartQuantity}р.
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
                            <strong className="p-total-price">{lastOrder.totalPrice}р.</strong>
                        </li>
                    </ul>
                ) : (
                    <ul className="p-items-cart">
                        <li>
                            <div className="no-order">Заказов не было</div>
                            <div className="create-line"></div>
                        </li>
                        </ul>
                )}
            </div>
        </div>
    );
}

export default Profile;
