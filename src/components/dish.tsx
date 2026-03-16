import { useState } from "react";

const counter = (min = 0, max = 5, initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increase = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  return { count, increase, decrease };
};

export const Dish = ({ dish }) => {
  const { count, increase, decrease } = counter();

  return (
    <li>
      <p>Название: {dish.name}</p>
      <p>Цена: {dish.price}</p>

      {dish.ingredients.length > 0 ? (
        <p>Ингредиенты: {dish.ingredients.join(", ")}</p>
      ) : (
        <p>Ингредиенты не указаны</p>
      )}

      <button onClick={decrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </li>
  );
};
