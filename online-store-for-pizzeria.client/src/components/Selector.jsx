import React, { useState } from 'react';

const Selector = ({ pizza }) => {
  const availableIngredients = pizza.ingredients;

  const [product, setProduct] = useState({
    ingredients: availableIngredients,
  });

  const handleCheckboxChange = (ingredient) => {
    // Проверяем, есть ли ингредиент в текущем списке
    const isIngredientIncluded = product.ingredients.includes(ingredient);

    // Если ингредиент включен, убираем его, иначе добавляем
    const updatedIngredients = isIngredientIncluded
      ? product.ingredients.filter((item) => item !== ingredient)
      : [...product.ingredients, ingredient];

    setProduct({
      ...product,
      ingredients: updatedIngredients,
    });
  };

  return (
    <div>
      <h2>Выбрать/Убрать из состава:</h2>
      <ul>
        {availableIngredients.map((ingredient) => (
          <li key={ingredient}>
            <div className="todo-item">
              <input
                type="checkbox"
                checked={product.ingredients.includes(ingredient)}
                onChange={() => handleCheckboxChange(ingredient)}
              />
              <p>{ingredient}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2>Текущий состав продукта:</h2>
      <ul>
        {product.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;