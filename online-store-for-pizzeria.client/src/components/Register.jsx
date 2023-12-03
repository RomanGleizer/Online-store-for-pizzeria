import { NavLink } from "react-router-dom";

function Register() {
  return (
    <div>
      <form>
        <div className="user-cont">
          <label className="email-name">Логин</label>
          <input className="email-input" />
        </div>

        <div className="dont-tell">Мы никому не сообщим вашу почту</div>

        <div className="password">
          <label className="pass-name">Пароль</label>
          <input type="password" className="password-input" />
        </div>
        <div className="rem-cont">
          <input type="checkbox" className="checkbox" />
          <label className="remember">Запомнить меня</label>
        </div>
        <button type="submit" className="sub-btn">
          <NavLink to="/" className="btn">
            <span className="home">Загеристрироваться</span>
          </NavLink>
        </button>
      </form>
    </div>
  );
}

export default Register;
