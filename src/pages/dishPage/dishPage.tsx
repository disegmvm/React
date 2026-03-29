import { Link, useParams } from "react-router";
import { Counter } from "../../components/counter/counter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectDishById, selectDishCountById } from "../../redux/selectors";
import { decrementItem, incrementItem } from "../../redux/slices/cartSlice";
import styles from "./dishPage.module.css";

export const DishPage = () => {
  const { dishId = "" } = useParams();
  const dispatch = useAppDispatch();
  const dish = useAppSelector((state) => selectDishById(state, dishId));
  const count = useAppSelector((state) => selectDishCountById(state, dishId));

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
