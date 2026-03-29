import { useEffect } from "react";
import { NavLink, Navigate, Outlet } from "react-router";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectRestaurantTabs,
  selectRestaurantsListError,
  selectRestaurantsListStatus,
} from "../../redux/selectors";
import { fetchRestaurants } from "../../redux/slices/restaurantsSlice";
import styles from "./restaurantsPage.module.css";

export const RestaurantsPage = () => {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector(selectRestaurantTabs);
  const status = useAppSelector(selectRestaurantsListStatus);
  const error = useAppSelector(selectRestaurantsListError);

  useEffect(() => {
    void dispatch(fetchRestaurants());
  }, [dispatch]);

  if (status === REQUEST_STATUS.pending) {
    return <div>Загружаем рестораны...</div>;
  }

  if (status === REQUEST_STATUS.failed) {
    return <div>{error ?? "Не удалось загрузить рестораны"}</div>;
  }

  if (restaurants.length === 0) {
    return <div>Рестораны не найдены</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.tabs}>
        {restaurants.map((restaurant) => (
          <NavLink
            key={restaurant.id}
            to={`/restaurants/${restaurant.id}/menu`}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.activeTab}` : styles.tab
            }
          >
            {restaurant.name}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </section>
  );
};

export const RestaurantsIndexRedirect = () => {
  const restaurants = useAppSelector(selectRestaurantTabs);
  const status = useAppSelector(selectRestaurantsListStatus);

  if (status !== REQUEST_STATUS.succeeded || restaurants.length === 0) {
    return null;
  }

  return <Navigate to={`/restaurants/${restaurants[0].id}/menu`} replace />;
};
