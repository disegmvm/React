import { restaurants } from "./constants/mock";

export const App = () => {
  return (
    <div>
      <h1>Рестораны</h1>

      <ul>
        {restaurants.map((restaurant) => (
          <li>
            <h2>{restaurant.name}</h2>

            <p>Меню:</p>
            <ul>
              {restaurant.menu.map((item) => (
                <li>
                  <p>Название: {item.name}</p>
                  <p>Цена: {item.price}</p>
                  <p>Ингредиенты: {item.ingredients.join(", ")}</p>
                </li>
              ))}
            </ul>

            <p>Отзывы:</p>
            <ul>
              {restaurant.reviews.map((review) => (
                <li>
                  <p>Пользователь: {review.user}</p>
                  <p>Отзыв: {review.text}</p>
                  <p>Оценка: {review.rating}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
