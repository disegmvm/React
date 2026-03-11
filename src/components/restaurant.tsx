import { Dish } from "./dish";

export const Restaurant = ({ restaurant }) => {
  return (
    <li>
      <h2>{restaurant.name}</h2>

      <p>Меню:</p>
      <ul>
        {restaurant.menu.map((dish) => (
          <Dish dish={dish} />
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
  );
};