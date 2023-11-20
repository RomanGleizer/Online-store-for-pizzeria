import { useEffect, useState } from 'react';
import './App.css';
import present from './image/present.png';
import pizFoCh from './image/pizFourCheese.jpg';
import Header from './components/Header';
import Footer from './components/Footer';

function Home() {
    return ( 
        <div className="home-div">
            <div className='body-home'>
                <div className='slidebar'>
                    <ul className='categories'>
                    <li className='categories-item'>Недавние заказы</li>
                    <li className='categories-item'>Популярные</li>
                    <li className='categories-item'>Мясные</li>
                    <li className='categories-item'>Вегетарианские</li>
                    <li className='categories-item'>Малокалорийные</li>
                    <li className='categories-item'>Сытные</li>
                    </ul>
                </div>
                <div className='discount'>
                    <ul className='discount-list'>
                    <li className='discount-list-item'>
                        <h2 className='present-h'>2=1!</h2>
                        <img className='present-img' src={present} alt='present' width={64} height={64}/>
                        <p className='present-discription'>Две пиццы по цене одной!</p> 
                        <p className='present-promo'>Промокод:</p>
                        <p className='present-code'>DUCK21</p>
                    </li>
                    </ul>
                </div>
                <div className='pizzas'>
                    <ul className='pizzas-list'>
                    <li className='pizzas-list-item'>
                        <img src={pizFoCh} alt='Пицца четыре сыра' width={278} height={267}/>
                        <p className='hit'>Хит!</p>
                        <p className='pizza-price'>700р.</p>
                        <h2 className='pizza-name'>Пицца 4 сыра</h2>
                        <p className='pizza-description'>Вкусная, ароматная пицца с пикантными нотками благородных сыров. Попробуйте, и вы не останетесь равнодушными!</p>
                    </li>
                    <li className='pizzas-list-item'>
                        <img src={pizFoCh} alt='Пицца четыре сыра' width={278} height={267}/>
                        <p className='hit'>Хит!</p>
                        <p className='pizza-price'>700р.</p>
                        <h2 className='pizza-name'>Пицца 4 сыра</h2>
                        <p className='pizza-description'>Вкусная, ароматная пицца с пикантными нотками благородных сыров. Попробуйте, и вы не останетесь равнодушными!</p>
                    </li>
                    <li className='pizzas-list-item'>
                        <img src={pizFoCh} alt='Пицца четыре сыра' width={278} height={267}/>
                        <p className='hit'>Хит!</p>
                        <p className='pizza-price'>700р.</p>
                        <h2 className='pizza-name'>Пицца 4 сыра</h2>
                        <p className='pizza-description'>Вкусная, ароматная пицца с пикантными нотками благородных сыров. Попробуйте, и вы не останетесь равнодушными!</p>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    );    
}

export default Home;