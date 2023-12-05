import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "../slices/cartSlice";

import Selector from "./Selector";

import { useGetAllProductsQuery } from "../slices/productsApi";
import data from "../Data.json";
import pizFoCh from "../image/pizFourCheese.jpg";
import pep from "../image/pep.jpg";
import karbo from "../image/karbo.jpg";
import sez from "../image/sez.jpg";
import vetch from "../image/vetch.jpg";
import "../styles/PizzaDetails.css";

const PizzaDetails = () => {
  let images = [sez, vetch, karbo, pizFoCh, pep];

  //   const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  //   const {  error, isLoading } = useGetAllProductsQuery();
  //   console.log("Api", isLoading);

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const [isRemove, setAddRemove] = useState(false);

  function handleAddRemoveClick() {
    setAddRemove(!isRemove);
    if (isRemove) handleRemoveFromCart(product);
    else handleAddToCart(product);
    console.log(product);
  }

  const proid = useParams();
  const proDetail = data.filter((x) => x.id == proid.id);
  const product = proDetail[0];

  return (
    <div key={product.id} className="product">
      <img className="image" src={images[product.id - 1]} alt={product.title} />
      <div className="info">
        <h3 className="title">{product.title}</h3>
        <div className="details">
          <div className="ingredients">{product.ingredients}</div>
          <div className="price">${product.price}</div>
        </div>

        <button className="btn" onClick={() => handleAddToCart(product)}>Добавить в корзину</button>

        {/* <div className="btn">
          <button onClick={handleAddRemoveClick}>
            {isRemove ? "Удалить из корзины" : "Добавить в корзину"}
          </button>
          {isRemove && (
            <div className="cart-product-quantity">
              <button onClick={() => handleDecreaseCart(product)}>-</button>
              <div className="count">{count}</div>
              <button onClick={() => handleAddToCart(product)}>+</button>
            </div>
          )}
        </div> */}
        {/* <Selector pizza={product}/> */}
      </div>
    </div>
  );
};

export default PizzaDetails;
