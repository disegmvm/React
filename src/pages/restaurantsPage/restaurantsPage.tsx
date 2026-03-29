import { NavLink, Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectRestaurantTabs } from "../../redux/selectors";
import styles from "./restaurantsPage.module.css";

export const RestaurantsPage = () => {
  const restaurants = useAppSelector(selectRestaurantTabs);

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

  if (restaurants.length === 0) {
    return <div>Рестораны не найдены</div>;
  }

  return <Navigate to={`/restaurants/${restaurants[0].id}/menu`} replace />;
};
