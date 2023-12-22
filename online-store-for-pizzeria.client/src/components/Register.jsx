import { NavLink } from "react-router-dom";
import "../styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogined, setUsername, setPhone } from "../slices/userSlice";
import { useState } from "react";

function Register() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [login, setLoginSelected] = useState("");

    const handleLoginChange = (event) => {
        setLoginSelected(event.target.value);
    };

    const [password, setPasswordSelected] = useState("");

    const handlePasswordChange = (event) => {
        setPasswordSelected(event.target.value);
    };

    const [name, setNameSelected] = useState("");

    const handleNameChange = (event) => {
        setNameSelected(event.target.value);
    };

    const [phone, setPhoneSelected] = useState("");

    const handlePhoneChange = (event) => {
        setPhoneSelected(event.target.value);
    };

    const handleRegisteredChange = async () => {
        const registerData = {
            login: login,
            password: password,
            name: name,
            phone: phone,
        };

        const requestOptions = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
        };

        const response = await fetch("https://localhost:7106/api/users/register", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate("/");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                dispatch(setLogined(true));
                dispatch(setUsername(data.name));
                dispatch(setPhone(data.phone));
                navigate("/");
            });
    };

    return (
        <div className="reg-cont">
            <div>
                <div className="regi">Впервые у нас? Зарегистрируйтесь!</div>
                <div className="user-cont">
                    <p className="email-name r-p">Напишите ваше имя</p>
                    <input
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Ваше имя"
                        className="email-input l-input no-radio"
                        required
                    />
                </div>

                <div className="user-cont">
                    <p className="email-name r-p">Придумайте логин</p>
                    <input
                        value={login}
                        onChange={handleLoginChange}
                        placeholder="Ваш логин"
                        className="email-input l-input no-radio"
                        required
                    />
                </div>

                <div className="password">
                    <p className="pass-name r-p">И придумайте пароль</p>
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Ваш пароль"
                        type="password"
                        className="password-input no-radio l-input"
                    />
                </div>

                <div className="mobile">
                    <p className="mobile-name r-p">И напишите телефончик :)</p>
                    <input
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+79000000000"
                        type="phone"
                        className="mobile-input no-radio l-input"
                    />
                </div>

                <button onChange={handleRegisteredChange} className="sub-btn">
                    Создать профиль
                </button>
            </div>
            <div className="delo">Это для дела, честно!</div>
        </div>
    );
}

export default Register;
