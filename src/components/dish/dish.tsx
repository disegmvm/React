import { Counter } from "../counter/counter";
import type { DishType } from "../types";
import styles from "./dish.module.css";
import { useUser } from "../userContext/userContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { decrementItem, incrementItem } from "../../redux/slices/cartSlice";
import { selectDishCountById } from "../../redux/selectors";

type DishProps = {
  dish: DishType;
};

export const Dish = ({ dish }: DishProps) => {
  const { isAuthorized } = useUser();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => selectDishCountById(state, dish.id));

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
          onIncrease={() => dispatch(incrementItem(dish.id))}
          onDecrease={() => dispatch(decrementItem(dish.id))}
          minValue={0}
          maxValue={5}
        />
      ) : null}
    </li>
  );
};
