import RegisterBtn from "./buttons/RegisterBtn";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogined, setFirstName, setPhone, setUsername, setLastOrder } from "../slices/userSlice";
import { useState } from "react";

function Login() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const [userName, setUsernameSelected] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameSelected(event.target.value);
    };

    const [password, setPasswordSelected] = useState("");

    const handlePasswordChange = (event) => {
        setPasswordSelected(event.target.value);
    };

    const [lastOrder, setLastOrderSelected] = useState({});    

    const handleLoginedChange = async () => {
        const userData = {          
            userName: userName,
            password: password,
        };

        const requestOptions = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };

        const response = await fetch("https://localhost:7106/api/users/login", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate("/");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                dispatch(setUsername(data.user.userName));
                dispatch(setLogined(true));
                dispatch(setFirstName(data.user.firstName));
                dispatch(setPhone(data.user.phone));
                dispatch(setLastOrder(data.lastOrder));
                //window.location.reload()
                navigate("/"); 
                console.log(user);               
            });
    };

    return (
        <div className="cont">
            <div className="email">
                <p className="email-name l-p">Логин</p>
                <input
                    placeholder="Ваш логин"
                    value={userName}
                    onChange={handleUsernameChange}
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
