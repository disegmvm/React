import { useEffect } from "react";
import { useParams } from "react-router";
import { Dish } from "../../components/dish/dish";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDishesByRestaurantId,
  selectDishesRequestError,
  selectDishesRequestStatus,
} from "../../redux/selectors";
import { fetchDishesByRestaurantId } from "../../redux/slices/dishesSlice";
import styles from "./menuPage.module.css";

export const MenuPage = () => {
  const { restaurantId = "" } = useParams();
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) =>
    selectDishesByRestaurantId(state, restaurantId),
  );
  const status = useAppSelector((state) =>
    selectDishesRequestStatus(state, restaurantId),
  );
  const error = useAppSelector((state) =>
    selectDishesRequestError(state, restaurantId),
  );

  useEffect(() => {
    if (restaurantId) {
      void dispatch(fetchDishesByRestaurantId({ restaurantId }));
    }
  }, [dispatch, restaurantId]);

  if (status === REQUEST_STATUS.pending) {
    return <p>Загружаем меню...</p>;
  }

  if (status === REQUEST_STATUS.failed) {
    return <p>{error ?? "Не удалось загрузить меню"}</p>;
  }

  if (dishes.length === 0) {
    return <p>Меню отсутствует</p>;
  }

  return (
    <ul className={styles.list}>
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </ul>
  );
};
