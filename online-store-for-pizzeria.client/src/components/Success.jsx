import React from "react";
import "../styles/Success.css";

const Success = () => {
    return (
        <div className="success">
            <div className="suc-inf">
                <p>Оплата прошла успешно!</p>
                <p>Скоро пицца будет у вас :)</p>
            </div>
            <p className="duck">*Даку понравилось ваше решение</p>
        </div>
    );
};

export default Success;
