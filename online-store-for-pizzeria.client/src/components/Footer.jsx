import '../App.css';

function Footer() {
    return (
        <footer>
            <ul className='footer-categories'>
                <li className='footer-categories-item'>Недавние заказы</li>
                <li className='footer-categories-item'>Популярные</li>
                <li className='footer-categories-item'>Мясные</li>
                <li className='footer-categories-item'>Вегетарианские</li>
                <li className='footer-categories-item'>Малокалорийные</li>
                <li className='footer-categories-item'>Сытные</li>
            </ul>
            <ul className='data'>
                <li className='adress'>Малышева 32</li>
                <li className='contacts'>Контакты: +7-000-000-00-00</li>
                <li className='telegram'>Наш чат-бот в Телеграмм</li>
            </ul>
            <p className='copyright'>©  Pizz&duck</p>
        </footer>
    );
}

export default Footer;