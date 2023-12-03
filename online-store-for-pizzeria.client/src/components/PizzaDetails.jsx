import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import data from "../Data.json";
import { useDispatch } from 'react-redux';
import {addItem, delItem} from '../redux/actions/index'
import pizFoCh from '../image/pizFourCheese.jpg';
import '../styles/PizzaDetails.css';

const PizzaDetails = () => {

    let images = [pizFoCh];  

    const [cartBtn, setCartBtn] = useState("Add to Cart")
    {/* Now we need a product id which is pass from the product page. */}
    const proid = useParams();
    const proDetail = data.filter(x=>x.id == proid.id)
    const product = proDetail[0];
    console.log(product);

    // We need to store useDispatch in a variable
    const dispatch = useDispatch()

    const handleCart = (product) => {
        if (cartBtn === "Add to Cart") {
            dispatch(addItem(product))
            setCartBtn("Remove from Cart")
        }
        else{
            dispatch(delItem(product))
            setCartBtn("Add to Cart")
        }
    }

    return (
        <>
        <div className="c">
            <div className="a">
                <div className="image">
                    <img src={images[0]} alt={product.title}height="400px" />
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