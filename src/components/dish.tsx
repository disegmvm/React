import { useState } from "react";

export const Dish = ({ dish }) => {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  };
  const remove = () => {
    setCount(count - 1);
  };

  return (
    <li>
      <p>Название: {dish.name}</p>
      <p>Цена: {dish.price}</p>
      <p>Ингредиенты: {dish.ingredients.join(", ")}</p>

      <button onClick={remove}>-</button>
      <span>{count}</span>
      <button onClick={add}>+</button>
    </li>
  );
};
