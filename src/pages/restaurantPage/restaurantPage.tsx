import { NavLink, Navigate, Outlet, useParams } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectRestaurantById } from "../../redux/selectors";
import styles from "./restaurantPage.module.css";

export const RestaurantPage = () => {
  const { restaurantId = "" } = useParams();
  const restaurant = useAppSelector((state) =>
    selectRestaurantById(state, restaurantId),
  );

  if (!restaurant) {
    return <div>Ресторан не найден</div>;
  }

  return (
    <div className={styles.restaurant}>
      <div className={styles.header}>
        <h2 className={styles.title}>{restaurant.name}</h2>

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

      <Outlet context={restaurant} />
    </div>
  );
};

export const RestaurantIndexRedirect = () => {
  const { restaurantId = "" } = useParams();

  return <Navigate to={`/restaurants/${restaurantId}/menu`} replace />;
};
