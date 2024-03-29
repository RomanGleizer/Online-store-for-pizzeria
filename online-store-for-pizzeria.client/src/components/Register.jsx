import { NavLink } from "react-router-dom";
import "../styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogined, setFirstName, setPhone, setUsername } from "../slices/userSlice";
import { useState } from "react";

function Register() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userName, setUsernameSelected] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameSelected(event.target.value);
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
            userName: userName,
            password: password,
            firstName: name,
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
                    dispatch(setLogined(true));
                    dispatch(setUsername(userName));
                    dispatch(setFirstName(name));
                    dispatch(setPhone(phone));
                    navigate("/");
                    window.location.reload()
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
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
                        value={userName}
                        onChange={handleUsernameChange}
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

                <button onClick={handleRegisteredChange} className="sub-btn">
                    Создать профиль
                </button>
            </div>
            <div className="delo">Это для дела, честно!</div>
        </div>
    );
}

export default Register;
