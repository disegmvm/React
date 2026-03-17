import classNames from "classnames";
import type { RestaurantType } from "./types";
import styles from "./tabs.module.css";

type TabsProps = {
  restaurants: RestaurantType[];
  activeRestaurantId: string;
  onChangeRestaurant: (id: string) => void;
};

export const Tabs = ({
  restaurants,
  activeRestaurantId,
  onChangeRestaurant,
}: TabsProps) => {
  return (
    <div className={styles.tabs}>
      {restaurants.map((restaurant) => (
        <button
          key={restaurant.id}
          type="button"
          onClick={() => onChangeRestaurant(restaurant.id)}
          disabled={restaurant.id === activeRestaurantId}
          className={classNames(styles.tabButton, {
            [styles.activeTabButton]: restaurant.id === activeRestaurantId,
          })}
        >
          {restaurant.name}
        </button>
      ))}
    </div>
  );
};