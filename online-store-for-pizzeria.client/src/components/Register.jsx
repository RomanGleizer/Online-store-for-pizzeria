import { NavLink } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    return (
        <div className="reg-cont">
            <div>
                <div className="regi">Впервые у нас? Зарегистрируйтесь!</div>
                <div className="user-cont">
                    <p className="email-name r-p">Напишите ваше имя</p>
                    <input
                        placeholder="Ваше имя"
                        className="email-input l-input no-radio"
                        required
                    />
                </div>

                <div className="user-cont">
                    <p className="email-name r-p">Придумайте логин</p>
                    <input
                        placeholder="Ваш логин"
                        className="email-input l-input no-radio"
                        required
                    />
                </div>

                <div className="password">
                    <p className="pass-name r-p">И придумайте пароль</p>
                    <input
                        placeholder="Ваш пароль"
                        type="password"
                        className="password-input no-radio l-input"
                    />
                </div>

                <div className="mobile">
                    <p className="mobile-name r-p">И напишите телефончик :)</p>
                    <input
                        placeholder="+79000000000"
                        type="phone"
                        className="mobile-input no-radio l-input"
                    />
                </div>

                <button type="submit" className="sub-btn">
                    <NavLink to="/" className="btn">
                        <p className="home">Создать профиль</p>
                    </NavLink>
                </button>
            </div>
            <div className="delo">Это для дела, честно!</div>
        </div>
    );
}

export default Register;
