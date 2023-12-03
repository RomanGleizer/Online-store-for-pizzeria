import { useEffect, useState } from 'react';
import './styles/Home.css';
import present from './image/present.png';
import data from "./Data.json";
import pizFoCh from './image/pizFourCheese.jpg';
import { NavLink } from 'react-router-dom';
import Test from './Test';

function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    let images = [pizFoCh];    

        return ( 
        <div className="home-div">
            <div className='autentification'>
                <input className='login' type="text" placeholder="Это текст"></input>
                <button className='btn-log'>Отправить</button>
            </div>
            <Test />
            <div className="container">
                <div className="search-container">
                    <input id="search" 
                    // autoСomplete="off" 
                    type="text" placeholder="Найти пиццу" onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} />
                </div>
            </div>
            <div className='body-home'>
                <div className='slidebar'>
                    <ul className='categories'>
                        <li className='categories-item'><button>Недавние заказы</button></li>
                        <li className='categories-item'><button>Популярные</button></li>
                        <li className='categories-item'><button>Мясные</button></li>
                        <li className='categories-item'><button>Вегетарианские</button></li>
                        <li className='categories-item'><button>Малокалорийные</button></li>
                        <li className='categories-item'><button>Сытные</button></li>
                    </ul>
                </div>
                <div className='discount'>
                    <ul className='discount-list'>
                        <li className='discount-list-item'>
                            <h2 className='present-h'>2=1!</h2>
                            <img className='present-img' src={present} alt='present' width={64} height={64}/>
                            <p className='present-description'>Две пиццы по цене одной!</p> 
                            <p className='present-promo'>Промокод:</p>
                            <p className='present-code'>DUCK21</p>
                        </li>
                    </ul>
                </div>
                <div className="template_Container">
                    {
                        data 
                            .filter((val) => {
                                if(searchTerm == ""){
                                return val;
                                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                                }
                            })
                            .map((val) => {
                                return(
                                <div className="template" key={val.id}>
                                    <div className='pizza-image'>                                    
                                        <img className="pizim"src={images[val.image]} alt={val.title} width={278} height={267}/>
                                        <div className='hit'>Хит!</div>
                                        <div className='pizza-price'>{val.price}р.</div>
                                    </div>
                                    <div className='description'> 
                                        <NavLink to={`/products/${val.id}`} className="pizza-name">{val.title}</NavLink>                                       
                                        {/* <button className='pizza-name'>{val.title}</button> */}
                                        <p className='pizza-description'>{val.description}</p>                                        
                                    </div>
                                </div> 
                                )
                            })
                    } 
                </div>
            </div>
        </div>
    );    
}

export default Home;