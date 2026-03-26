import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { restaurants } from "../../constants/mock";
import { store } from "../../redux/store";
import { Layout } from "../layout/layout";
import { Restaurant } from "../restaurant/restaurant";
import { Tabs } from "../tabs/tabs";
import { ThemeProvider } from "../themeContext/themeContext";
import { UserProvider } from "../userContext/userContext";
import styles from "./app.module.css";
import "../../index.css";

const root = document.getElementById("root");

const AppView = () => {
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

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <UserProvider>
        <AppView />
      </UserProvider>
    </ThemeProvider>
  </Provider>
);

if (root) {
  createRoot(root).render(<App />);
}
