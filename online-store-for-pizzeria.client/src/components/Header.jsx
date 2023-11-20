import '../App.css';
import logo from '../image/logo.svg';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className="App-header">            
            <ul>
                <li><Link to="/"> <img className='logo-main' src={logo} alt="logo" width={329} height={100}/></Link></li>
                <li><Link to="/cart">Корзина</Link></li>
                <li><Link to="/profile">Личный кабинет</Link></li>
            </ul>
            <input className='search'></input>
        </header>
    );
}

export default Header;