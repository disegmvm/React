import type { FC } from "react";
import { NavLink, Navigate, Outlet, useParams } from "react-router";
import { useGetRestaurantByIdQuery } from "../../api/restaurantsApi";
import styles from "./restaurantPage.module.css";

export const RestaurantPage: FC = () => {
  const { restaurantId = "" } = useParams();
  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useGetRestaurantByIdQuery(restaurantId, {
    skip: !restaurantId,
  });

  if (isLoading && !restaurant) {
    return <div>Загружаем ресторан...</div>;
  }

  if (isError && !restaurant) {
    return <div>{"status" in error ? "Не удалось загрузить ресторан" : error.message}</div>;
  }

  if (!restaurant) {
    return <div>Ресторан не найден</div>;
  }

  return (
    <div className={styles.restaurant}>
      <div className={styles.header}>
        <h2 className={styles.title}>{restaurant.name}</h2>
        <p className={styles.description}>
          {restaurant.description || "Описание ресторана пока отсутствует"}
        </p>
        <p className={styles.meta}>
          Кухня: {restaurant.cuisine || "не указана"} | Формат:{" "}
          {restaurant.format || "не указан"} | Средний чек:{" "}
          {restaurant.averageCheck || "не указан"}
        </p>

        <div className={styles.sectionTabs}>
          <NavLink
            to={`/restaurants/${restaurant.id}/menu`}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.activeTab}` : styles.tab
            }
          >
            Меню
          </NavLink>

          <NavLink
            to={`/restaurants/${restaurant.id}/reviews`}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.activeTab}` : styles.tab
            }
          >
            Отзывы
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export const RestaurantIndexRedirect: FC = () => {
  const { restaurantId = "" } = useParams();

  return <Navigate to={`/restaurants/${restaurantId}/menu`} replace />;
};
