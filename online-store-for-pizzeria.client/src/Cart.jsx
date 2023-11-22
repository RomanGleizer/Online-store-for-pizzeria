import './styles/Cart.css';
import logo from './image/logo.svg';

function Cart() {
    return (
            <div className='cart-body'>
                <h1 className='cart-h'>Оформление заказа</h1>
                <div className='cart-name-h'>
                    <h2 className='cart-name'>Имя</h2>
                    <button className='cart-name-change'>Изменить</button>
                </div>
                <div className='cart-phone'>
                    <h2 className='cart-phone-h'>Номер телефона</h2>
                    <button className='cart-phone-change'>Изменить</button>
                </div> 
                <div className='cart-adreess'>
                    <h2 className='cart-adreess-h'>Адрес доставки</h2>
                    <button className='cart-adreess-change'>Изменить</button>
                </div>
                <div className='cart-promocode'>
                    <h2 className='cart-promocode-h'>Промокод</h2>
                    <input className='cart-promocode-input'></input>
                    <button className='cart-promocode-send'></button>
                </div>
                <div className='cart-pay'>
                    <ul className='cart-pay-list'>
                        <li className='cart-pay-list-item'>
                            <button className='cart-pay-list-item-button'></button>
                            <p className='cart-pay-list-item-p'>4279 **** **** 3685</p>
                        </li>    
                    </ul>    
                </div>
                <div className='cart-orders'>
                    <h2 className='cart-order-h'>Заказ</h2>
                    <ul className='cart-order-list'>
                        <li className='cart-order-list-item'>
                            <p className='cart-pizza-name'>Пицца 4 сыра</p>
                            <p className='cart-pizza-description'>средняя 27 см</p>
                            <p className='cart-pizza-count'>x12</p>
                            <p className='cart-pizza-price'>8400р</p>
                        </li>    
                    </ul>
                    <div className='cart-delivery'>
                        <p className='cart-delivery-p'>Доставка</p>
                        <p className='cart-delivery-description'>Бесплатно</p>
                        <p className='cart-delivery-count'>1 товар</p>
                        <p className='cart-delivery-price'>8400р</p>
                    </div>
                    <div className='cart-result'>
                        <p className='cart-result-name'>Сумма заказа</p>
                        <p className='cart-result-price'>8400р</p>    
                    </div>    
                </div>
                <button className='cart-button-order'>Заказать</button> 
            </div>
    )
}

export default Cart;