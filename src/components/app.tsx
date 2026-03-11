import { useState } from "react";
import { restaurants } from "./constants/mock";
import { Layout } from "./layout/layout";
import { Restaurant } from "./restaurant";

export const App = () => {
  const [activeRestaurantId, setActiveRestaurantId] = useState(
    restaurants[0].id,
  );

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeRestaurantId,
  );

  return (
    <Layout>
      <div>
        {restaurants.map((restaurant) => (
          <button onClick={() => setActiveRestaurantId(restaurant.id)}>
            Ресроран "{restaurant.name}"
          </button>
        ))}
      </div>

      <ul>
        <Restaurant restaurant={activeRestaurant} />
      </ul>
    </Layout>
  );
};
