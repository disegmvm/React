import { Dish } from "./dish";

export const Restaurant = ({ restaurant }) => {
  return (
    <li>
      <h2>{restaurant.name}</h2>

      <p>Меню:</p>
      {restaurant.menu.length > 0 ? (
        <ul>
          {restaurant.menu.map((dish) => (
            <Dish dish={dish} />
          ))}
        </ul>
      ) : (
        <p>Меню нет</p>
      )}

      <p>Отзывы:</p>
      {restaurant.reviews.length > 0 ? (
        <ul>
          {restaurant.reviews.map((review) => (
            <li key={review.id}>
              <p>Пользователь: {review.user}</p>
              <p>Отзыв: {review.text}</p>
              <p>Оценка: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Отзывов нет</p>
      )}
    </li>
  );
};