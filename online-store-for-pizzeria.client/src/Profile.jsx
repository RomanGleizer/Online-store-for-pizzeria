import "./styles/Profile.css";
import logo from "./image/logo.svg";
import visa from "./image/visa.svg";

function Profile() {
  return (
    <div className="profile-body">
      <div className="about-customer">
        <h1 className="order-title">Личный кабинет</h1>
        <div className="name option between">
          <span className="main-span">Имя</span>
          <input
            className="no-radio"
            type="text"
            placeholder="Ваше имя"
            required
          />
        </div>
        <div className="phone option between">
          <span className="main-span">Номер телефона</span>
          <input
            className="no-radio"
            type="phone"
            placeholder="+79000000000"
            required
          />
        </div>
        <div className="profile-notification">
          <h2 className="profile-notification-h">Смс-рассылки</h2>
          <div className="notification">
            <input
              type="checkbox"
              className="profile-notification-change"
            ></input>
            <span className="profile-notification-change">хочу получать смс-рассылки с акциями и промокодами</span>
          </div>
        </div>

        <div className="credit-cards">
          <h2 className="profile-credit-cards">Привязанные карты</h2>

          <div className="credit-cards-list">
            <img
              className="credit-card-img"
              src={visa}
              alt="visa"
              width={57}
              height={31}
            />
            <p className="credit-card-number">4279 **** **** 3685</p>
            <button className="credit-card-delete">X</button>
          </div>
        </div>
        <button className="profile-exit">Выйти</button>
      </div>
      <div className="orders">
        <ul className="p-items-cart">
          <li>
            <div className="pr-order-name">Последний заказ 13.11.2023</div>
            <div className="create-line"></div>
          </li>
          <div className="p-cart-item">
            <div className="p-cart-product">
              <h3 className="p-title">Четыре сезона</h3>
              <p className="p-price">700р.</p>
            </div>

            <div className="p-count">х12</div>

            <div className="p-cart-product-total-price">8400р.</div>
          </div>
          {/* {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="p-cart-item" key={cartItem.id}>
                  <div className="p-cart-product">
                    <h3 className="p-title">{cartItem.title}</h3>
                    <p className="p-price">{cartItem.price}р.</p>
                  </div>

                  <div className="p-count">х{cartItem.cartQuantity}</div>

                  <div className="p-cart-product-total-price">
                    {cartItem.price * cartItem.cartQuantity}р.
                  </div>
                </div>
              ))} */}

          <li>
            <div className="create-line"></div>
          </li>

          <li className="p-delivery between">
            <span className="p-total-span">Доставка</span>
            <strong className="p-total-price">Бесплатно</strong>
          </li>

          <li className="p-total-amount between">
            <span className="p-total-span">12 товар</span>
            <strong className="p-total-price">8400р.</strong>
          </li>

          <li>
            <div className="create-line"></div>
          </li>

          <li className="p-total-amount between">
            <span className="p-total-span">Сумма заказа</span>
            <strong className="p-total-price">8400р.</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
