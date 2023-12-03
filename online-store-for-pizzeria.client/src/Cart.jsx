import "./styles/Cart.css";
import logo from "./image/logo.svg";
import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const state = useSelector((state) => state.addItem);

  var total = 0;
  const itemList = (item) => {
    total = total + item.price;
    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">{item.title}</h6>
        </div>
        <span className="text-muted">${item.price}</span>
      </li>
    );
  };
  // <div className='cart-body'>
  //     <h1 className='cart-h'>Оформление заказа</h1>
  //     <div className='cart-name-h'>
  //         <h2 className='cart-name'>Имя</h2>
  //         <button className='cart-name-change'>Изменить</button>
  //     </div>
  //     <div className='cart-phone'>
  //         <h2 className='cart-phone-h'>Номер телефона</h2>
  //         <button className='cart-phone-change'>Изменить</button>
  //     </div>
  //     <div className='cart-adreess'>
  //         <h2 className='cart-adreess-h'>Адрес доставки</h2>
  //         <button className='cart-adreess-change'>Изменить</button>
  //     </div>
  //     <div className='cart-promocode'>
  //         <h2 className='cart-promocode-h'>Промокод</h2>
  //         <input className='cart-promocode-input'></input>
  //         <button className='cart-promocode-send'></button>
  //     </div>
  //     <div className='cart-pay'>
  //         <ul className='cart-pay-list'>
  //             <li className='cart-pay-list-item'>
  //                 <button className='cart-pay-list-item-button'></button>
  //                 <p className='cart-pay-list-item-p'>4279 **** **** 3685</p>
  //             </li>
  //         </ul>
  //     </div>
  //     <div className='cart-orders'>
  //         <h2 className='cart-order-h'>Заказ</h2>
  //         <ul className='cart-order-list'>
  //             <li className='cart-order-list-item'>
  //                 <p className='cart-pizza-name'>Пицца 4 сыра</p>
  //                 <p className='cart-pizza-description'>средняя 27 см</p>
  //                 <p className='cart-pizza-count'>x12</p>
  //                 <p className='cart-pizza-price'>8400р</p>
  //             </li>
  //         </ul>
  //         <div className='cart-delivery'>
  //             <p className='cart-delivery-p'>Доставка</p>
  //             <p className='cart-delivery-description'>Бесплатно</p>
  //             <p className='cart-delivery-count'>1 товар</p>
  //             <p className='cart-delivery-price'>8400р</p>
  //         </div>
  //         <div className='cart-result'>
  //             <p className='cart-result-name'>Сумма заказа</p>
  //             <p className='cart-result-price'>8400р</p>
  //         </div>
  //     </div>
  //     <button className='cart-button-order'>Заказать</button>
  // </div>

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    defaultValue=''
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    defaultValue=''
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>                

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>                
              </div>

              <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
