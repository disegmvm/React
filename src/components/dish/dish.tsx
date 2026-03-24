import { Counter } from "../counter/counter";
import { useCounter } from "../useCounter";
import type { DishType } from "../types";
import styles from "./dish.module.css";
import { useUser } from "../userContext/userContext";

type DishProps = {
  dish: DishType;
};

export const Dish = ({ dish }: DishProps) => {
  const { count, increase, decrease } = useCounter(0, 5, 0);
  const { isAuthorized } = useUser();

  return (
    <li className={styles.dish}>
      <p>Название: {dish.name}</p>
      <p>Цена: {dish.price}</p>

      {dish.ingredients && dish.ingredients.length > 0 ? (
        <p>Ингредиенты: {dish.ingredients.join(", ")}</p>
      ) : (
        <p>Ингредиенты не указаны</p>
      )}

      {isAuthorized ? (
        <Counter
          value={count}
          onIncrease={increase}
          onDecrease={decrease}
          minValue={0}
          maxValue={5}
        />
      ) : null}
    </li>
  );
};