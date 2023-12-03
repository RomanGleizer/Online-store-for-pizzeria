import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import data from "../Data.json";
import { useDispatch } from 'react-redux';
import {addItem, delItem} from '../redux/actions/index'
import pizFoCh from '../image/pizFourCheese.jpg';
import '../styles/PizzaDetails.css';

const PizzaDetails = () => {

    let images = [pizFoCh, pizFoCh, pizFoCh, pizFoCh, pizFoCh];

    const [cartBtn, setCartBtn] = useState("Добавить в корзину")
    const proid = useParams();
    const proDetail = data.filter(x=>x.id == proid.id)
    const product = proDetail[0];
    console.log(product);

    const dispatch = useDispatch()

    const handleCart = (product) => {
        if (cartBtn === "Добавить в корзину") {
            dispatch(addItem(product))
            setCartBtn("Удалить из корзины")
        }
        else{
            dispatch(delItem(product))
            setCartBtn("Добавить в корзину")
        }
    }

    return (
        <>
        <div className="c">
            <div className="a">
                <div className="image">
                    <img src={images[product.id-1]} alt={product.title} height="400px" />
                </div>
                <div className="all-description">
                    <h1 className="title">{product.title}</h1>
                    <hr />
                    <h2 className="price">${product.price}</h2>
                    <p className="descrip">{product.description}</p>
                    <button onClick={()=>handleCart(product)} className="cartBtn">{cartBtn}</button>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default PizzaDetails;