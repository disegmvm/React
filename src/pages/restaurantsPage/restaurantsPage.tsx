import { NavLink, Navigate, Outlet } from "react-router";
import { useGetRestaurantsQuery } from "../../api/restaurantsApi";
import styles from "./restaurantsPage.module.css";

export const RestaurantsPage = () => {
  const {
    data: restaurants = [],
    isLoading,
    isError,
    error,
  } = useGetRestaurantsQuery();

  if (isLoading) {
    return <div>Загружаем рестораны...</div>;
  }

  if (isError) {
    return <div>{"status" in error ? "Не удалось загрузить рестораны" : error.message}</div>;
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
  const { data: restaurants = [], isSuccess } = useGetRestaurantsQuery();

  if (!isSuccess || restaurants.length === 0) {
    return null;
  }

  return <Navigate to={`/restaurants/${restaurants[0].id}/menu`} replace />;
};
