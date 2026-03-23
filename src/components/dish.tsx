import { Counter } from "./counter";
import { useCounter } from "./useCounter";
import type { DishType } from "./types";
import styles from "./dish.module.css";

type DishProps = {
  dish: DishType;
};

export const Dish = ({ dish }: DishProps) => {
  const { count, increase, decrease } = useCounter(0, 5, 0);

  return (
    <li className={styles.dish}>
      <p>Название: {dish.name}</p>
      <p>Цена: {dish.price}</p>

      {dish.ingredients && dish.ingredients.length > 0 ? (
        <p>Ингредиенты: {dish.ingredients.join(", ")}</p>
      ) : (
        <p>Ингредиенты не указаны</p>
      )}

      <Counter
        value={count}
        onIncrease={increase}
        onDecrease={decrease}
        minValue={0}
        maxValue={5}
      />
    </li>
  );
};