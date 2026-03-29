import { useEffect } from "react";
import { NavLink, Navigate, Outlet, useParams } from "react-router";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectRestaurantById,
  selectRestaurantRequestError,
  selectRestaurantRequestStatus,
} from "../../redux/selectors";
import { fetchRestaurantById } from "../../redux/slices/restaurantsSlice";
import styles from "./restaurantPage.module.css";

export const RestaurantPage = () => {
  const { restaurantId = "" } = useParams();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );
  const status = useAppSelector((state) =>
    selectRestaurantRequestStatus(state, restaurantId),
  );
  const error = useAppSelector((state) =>
    selectRestaurantRequestError(state, restaurantId),
  );

  useEffect(() => {
    if (restaurantId) {
      void dispatch(fetchRestaurantById(restaurantId));
    }
  }, [dispatch, restaurantId]);

  if (status === REQUEST_STATUS.pending && !restaurant) {
    return <div>Загружаем ресторан...</div>;
  }

  if (status === REQUEST_STATUS.failed && !restaurant) {
    return <div>{error ?? "Не удалось загрузить ресторан"}</div>;
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

export const RestaurantIndexRedirect = () => {
  const { restaurantId = "" } = useParams();

  return <Navigate to={`/restaurants/${restaurantId}/menu`} replace />;
};
