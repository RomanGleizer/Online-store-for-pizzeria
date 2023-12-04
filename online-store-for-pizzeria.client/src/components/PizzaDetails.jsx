import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useGetAllProductsQuery } from "../slices/productsApi";
import data from "../Data.json";
import pizFoCh from "../image/pizFourCheese.jpg";
import "../styles/PizzaDetails.css";

const PizzaDetails = () => {
  let images = [pizFoCh, pizFoCh, pizFoCh, pizFoCh, pizFoCh];

  //   const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const {  error, isLoading } = useGetAllProductsQuery();
  //   console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const proid = useParams();
  const proDetail = data.filter((x) => x.id == proid.id);
  const product = proDetail[0];

  return (
    <div key={product.id} className="product">
      <h3>{product.name}</h3>
      <img src={images[product.id - 1]} alt={product.title} />
      <div className="details">
        <span>{product.description}</span>
        <span className="price">${product.price}</span>
      </div>
      <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
    </div>
  );
};

export default PizzaDetails;
