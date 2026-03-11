import { restaurants } from "./constants/mock";
import { Layout } from "./layout/layout";
import { Restaurant } from "./restaurant";

export const App = () => {
  return (
    <Layout>
      <ul>
        {restaurants.map((restaurant) => (
          <Restaurant restaurant={restaurant} />
        ))}
      </ul>
    </Layout>
  );
};