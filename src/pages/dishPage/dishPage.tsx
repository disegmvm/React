import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Counter } from "../../components/counter/counter";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDishById,
  selectDishCountById,
  selectDishRequestError,
  selectDishRequestStatus,
} from "../../redux/selectors";
import { fetchDishById } from "../../redux/slices/dishesSlice";
import { decrementItem, incrementItem } from "../../redux/slices/cartSlice";
import styles from "./dishPage.module.css";

export const DishPage = () => {
  const { dishId = "" } = useParams();
  const dispatch = useAppDispatch();
  const dish = useAppSelector((state) => selectDishById(state, dishId));
  const count = useAppSelector((state) => selectDishCountById(state, dishId));
  const status = useAppSelector((state) => selectDishRequestStatus(state, dishId));
  const error = useAppSelector((state) => selectDishRequestError(state, dishId));

  useEffect(() => {
    if (dishId) {
      void dispatch(fetchDishById(dishId));
    }
  }, [dishId, dispatch]);

  if (status === REQUEST_STATUS.pending && !dish) {
    return <div>Загружаем блюдо...</div>;
  }

  if (status === REQUEST_STATUS.failed && !dish) {
    return <div>{error ?? "Не удалось загрузить блюдо"}</div>;
  }

  if (!dish) {
    return <div>Блюдо не найдено</div>;
  }

  return (
    <article className={styles.page}>
      <Link to="/restaurants" className={styles.backLink}>
        Назад к ресторанам
      </Link>

      <div className={styles.card}>
        <p className={styles.label}>Карточка блюда</p>
        <h2 className={styles.title}>{dish.name}</h2>
        <p className={styles.price}>Цена: {dish.price}</p>
        <p className={styles.ingredients}>
          Ингредиенты: {dish.ingredients?.join(", ") || "не указаны"}
        </p>

        <Counter
          value={count}
          onIncrease={() => dispatch(incrementItem(dish.id))}
          onDecrease={() => dispatch(decrementItem(dish.id))}
          minValue={0}
          maxValue={5}
        />
      </div>
    </article>
  );
};
