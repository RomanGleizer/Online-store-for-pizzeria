import { useEffect, useState } from "react";
import "./styles/Home.css";
import present from "./image/present.png";
import data from "./Data.json";
import pizFoCh from "./image/pizFourCheese.jpg";
import pep from "./image/pep.jpg";
import karbo from "./image/karbo.jpg";
import sez from "./image/sez.jpg";
import vetch from "./image/vetch.jpg";
import { NavLink } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState('All'); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory === 'All'
    ? data
    : data.filter(item => item.сategories.includes(selectedCategory));

  let images = [sez, vetch, karbo, pizFoCh, pep];  

  return (
    <div className="home-div">      
      <div className="container">
        <div className="search-container">
          <input
            id="search"
            // autoСomplete="off"
            type="text"
            placeholder="Найти пиццу"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="body-home">
        <div className="slidebar">
          <ul className="categories">
            <li className="categories-item">
              <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => handleCategoryChange('All')}>Общее меню</button>
            </li>
            <li className="categories-item">
              <button className={selectedCategory === 'Популярные' ? 'active' : ''} onClick={() => handleCategoryChange('Популярные')}>Популярные</button>
            </li>
            <li className="categories-item">
              <button className={selectedCategory === 'Мясные' ? 'active' : ''} onClick={() => handleCategoryChange('Мясные')}>Мясные</button>
            </li>
            <li className="categories-item">
              <button className={selectedCategory === 'Вегетарианские' ? 'active' : ''} onClick={() => handleCategoryChange('Вегетарианские')}>Вегетарианские</button>
            </li>
            <li className="categories-item">
              <button className={selectedCategory === 'Малокалорийные' ? 'active' : ''} onClick={() => handleCategoryChange('Малокалорийные')}>Малокалорийные</button>
            </li>
            <li className="categories-item">
              <button className={selectedCategory === 'Сытные' ? 'active' : ''} onClick={() => handleCategoryChange('Сытные')}>Сытные</button>
            </li>
          </ul>
        </div>
        <div className="discount">
          <ul className="discount-list">
            <li className="discount-list-item">
              <h2 className="present-h">2=1!</h2>
              <img
                className="present-img"
                src={present}
                alt="present"
                width={64}
                height={64}
              />
              <p className="present-description">Две пиццы по цене одной!</p>
              <p className="present-promo">Промокод:</p>
              <p className="present-code">DUCK21</p>
            </li>
          </ul>
        </div>
        <div className="template_Container">
          {filteredItems
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val) => {
              return (
                <div className="template" key={val.id}>
                  <div className="pizza-image">
                    <img
                      className="pizim"
                      src={images[val.id-1]}
                      alt={val.title}
                      width={278}
                      height={267}
                    />
                    <div className="hit">Хит!</div>
                    <div className="pizza-price">{val.price}р.</div>
                  </div>
                  <div className="description">
                    <NavLink to={`/products/${val.id}`} className="pizza-name">
                      {val.title}
                    </NavLink>
                    <p className="pizza-description">{val.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
