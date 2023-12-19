import RegisterBtn from "./buttons/RegisterBtn";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogined, setUsername, setPhone } from "../slices/userSlice";
import { useState } from "react";

function Login() {
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

    const handleLoginedChange = async () => {
        const userData = {          
            login: login,
            password: password,
        };

        const requestOptions = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };

        const response = await fetch("https://localhost:7106/api/login", requestOptions)
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
        <div className="cont">
            <div className="email">
                <p className="email-name l-p">Почта</p>
                <input
                    placeholder="Ваш логин"
                    value={login}
                    onChange={handleLoginChange}
                    className="email-input l-input no-radio"
                    required
                />
            </div>
            <div className="password">
                <p className="pass-name l-p">Пароль</p>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Ваш пароль"
                    className="password-input l-input no-radio"
                    required
                />
            </div>
            <button className="sub-btn" onClick={handleLoginedChange}>
                Войти
            </button>
            <RegisterBtn />
        </div>
    );
}

export default Login;
