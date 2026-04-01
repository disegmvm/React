import { Link } from "react-router";
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
  const handleIncrease = () =>
    dispatch(
      incrementItem({
        id: dish.id,
        name: dish.name,
        price: dish.price,
      }),
    );

  return (
    <li className={styles.dish}>
      <p>
        Название:{" "}
        <Link to={`/dish/${dish.id}`} className={styles.link}>
          {dish.name}
        </Link>
      </p>
      <p>Цена: {dish.price}</p>

      {dish.ingredients && dish.ingredients.length > 0 ? (
        <p>Ингредиенты: {dish.ingredients.join(", ")}</p>
      ) : (
        <p>Ингредиенты не указаны</p>
      )}

      {isAuthorized ? (
        <Counter
          value={count}
          onIncrease={handleIncrease}
          onDecrease={() => dispatch(decrementItem(dish.id))}
          minValue={0}
          maxValue={5}
        />
      ) : null}
    </li>
  );
};
