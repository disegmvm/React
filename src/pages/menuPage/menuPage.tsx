import type { FC } from "react";
import { useParams } from "react-router";
import { useGetDishesByRestaurantIdQuery } from "../../api/restaurantsApi";
import { Dish } from "../../components/dish/dish";
import styles from "./menuPage.module.css";

export const MenuPage: FC = () => {
  const { restaurantId = "" } = useParams();
  const {
    data: dishes = [],
    isLoading,
    isError,
    error,
  } = useGetDishesByRestaurantIdQuery(restaurantId, {
    skip: !restaurantId,
  });

  if (isLoading) {
    return <p>Загружаем меню...</p>;
  }

  if (isError) {
    return <p>{"status" in error ? "Не удалось загрузить меню" : error.message}</p>;
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
