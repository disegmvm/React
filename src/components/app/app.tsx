import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import {
  selectRestaurantById,
  selectRestaurants,
} from "../../redux/selectors";
import { store } from "../../redux/store";
import { Layout } from "../layout/layout";
import { Restaurant } from "../restaurant/restaurant";
import { Tabs } from "../tabs/tabs";
import { ThemeProvider } from "../themeContext/themeContext";
import { UserProvider } from "../userContext/userContext";
import styles from "./app.module.css";

const AppView = () => {
  const restaurants = useAppSelector(selectRestaurants);
  const [activeRestaurantId, setActiveRestaurantId] = useState("");
  const activeRestaurant = useAppSelector((state) =>
    selectRestaurantById(state, activeRestaurantId),
  );

  useEffect(() => {
    if (!activeRestaurantId && restaurants.length > 0) {
      setActiveRestaurantId(restaurants[0].id);
    }
  }, [activeRestaurantId, restaurants]);

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

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <UserProvider>
        <AppView />
      </UserProvider>
    </ThemeProvider>
  </Provider>
);
