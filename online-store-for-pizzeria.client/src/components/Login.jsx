import RegisterBtn from "./buttons/RegisterBtn";
import "../styles/Login.css"

function Login() {
  return (
    <div className="cont">
        
        <div className="email">
          <p className="email-name l-p">Почта</p>
          <input placeholder="Ваш логин" className="email-input l-input no-radio" required />
          {/* <div className="dont-tell">Мы никому не скажем почту</div> */}
        </div>
        <div className="password">
          <p className="pass-name l-p">Пароль</p>
          <input type="password" placeholder="Ваш пароль" className="password-input l-input no-radio" required/>
        </div>
        {/* <div className="rem-cont">
          <input type="checkbox" className="checkbox" />
          <span className="remember">Запомнить меня</span>
        </div> */}
        <button type="submit" className="sub-btn">
          Войти
        </button>
      <RegisterBtn />
    </div>
  );
}

export default Login;
