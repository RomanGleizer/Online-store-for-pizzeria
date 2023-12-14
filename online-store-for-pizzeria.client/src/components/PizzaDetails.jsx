import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import data from "../Data.json";
import pizFoCh from "../image/pizFourCheese.jpg";
import pep from "../image/pep.jpg";
import karbo from "../image/karbo.jpg";
import sez from "../image/sez.jpg";
import vetch from "../image/vetch.jpg";
import "../styles/PizzaDetails.css";

const PizzaDetails = () => {
    let images = [sez, vetch, karbo, pizFoCh, pep];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };

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

                <button className="btn" onClick={() => handleAddToCart(product)}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default PizzaDetails;
