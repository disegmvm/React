import { useState } from "react";

export const Dish = ({ dish }) => {
  const [count, setCount] = useState(0);
  const increase = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };
  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

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