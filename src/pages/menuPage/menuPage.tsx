import { useOutletContext } from "react-router";
import { Dish } from "../../components/dish/dish";
import type { RestaurantType } from "../../components/types";
import styles from "./menuPage.module.css";

export const MenuPage = () => {
  const restaurant = useOutletContext<RestaurantType>();

  if (restaurant.menu.length === 0) {
    return <p>Меню отсутствует</p>;
  }

  return (
    <ul className={styles.list}>
      {restaurant.menu.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </ul>
  );
};
