import { useState } from "react";
import { restaurants } from "../../constants/mock";
import { Layout } from "../layout/layout";
import { Restaurant } from "../restaurant/restaurant";
import { Tabs } from "../tabs/tabs";
import styles from "./app.module.css";

export const App = () => {
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>(
    restaurants[0].id,
  );

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeRestaurantId,
  );

  if (!activeRestaurant) {
    return <div>Ресторан не найден</div>;
  }

  return (
    <Layout>
      <div className={styles.app}>
        <Tabs
          restaurants={restaurants}
          activeRestaurantId={activeRestaurantId}
          onChangeRestaurant={setActiveRestaurantId}
        />

        <ul className={styles.restaurantList}>
          <Restaurant key={activeRestaurant.id} restaurant={activeRestaurant} />
        </ul>
      </div>
    </Layout>
  );
};