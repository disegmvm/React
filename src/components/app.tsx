import { restaurants } from "./constants/mock";
import { Restaurant } from "./restaurant";

export const App = () => {
  return (
    <div>
      <h1>Рестораны</h1>

      <ul>
        {restaurants.map((restaurant) => (
          <Restaurant restaurant={restaurant} />
        ))}
      </ul>
    </div>
  );
};