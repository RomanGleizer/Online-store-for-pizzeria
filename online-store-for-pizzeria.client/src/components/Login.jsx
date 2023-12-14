import RegisterBtn from "./buttons/RegisterBtn";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLogined, setUsername, setPhone} from '../slices/userSlice';


function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginedChange = (e) => {
      dispatch(setLogined(true));
      dispatch(setUsername('Roma'));
      dispatch(setPhone("+79865432102"));
      navigate("/");
      
  };

  return (
    <div className="cont">
        
        <div className="email">
          <p className="email-name l-p">Почта</p>
          <input placeholder="Ваш логин" className="email-input l-input no-radio" required />
          
        </div>
        <div className="password">
          <p className="pass-name l-p">Пароль</p>
          <input type="password" placeholder="Ваш пароль" className="password-input l-input no-radio" required/>
        </div>
        <button type="submit" className="sub-btn" onClick={handleLoginedChange}>
          Войти
        </button>
      <RegisterBtn />
    </div>
  );
}

export default Login;
