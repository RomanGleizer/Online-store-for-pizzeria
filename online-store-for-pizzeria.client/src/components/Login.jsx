import RegisterBtn from "./buttons/RegisterBtn";

function Login() {
  return (
    <div className="cont">
      <form>
        <div className="name">
          <label className="name-name">Почта</label>
          <input className="name-input" />
        </div>
        <div className="email">
          <label className="email-name">Почта</label>
          <input className="email-input" />
          <div className="dont-tell">Мы никому не скажем почту</div>
        </div>
        <div className="password">
          <label className="pass-name">Пароль</label>
          <input type="password" className="password-input" />
        </div>
        <div className="rem-cont">
          <input type="checkbox" className="checkbox" />
          <label className="remember">Запомнить меня</label>
        </div>
        <button type="submit" className="sub-btn">
          Войти
        </button>
      </form>
      <RegisterBtn />
    </div>
  );
}

export default Login;
