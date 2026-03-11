import { Dish } from "./dish";

export const Restaurant = ({ restaurant }) => {
  return (
    <li>
      <h2>{restaurant.name}</h2>

      {restaurant.menu.length > 0 ? (
        <>
          <p>Меню:</p>
          <ul>
            {restaurant.menu.map((dish) => (
              <Dish dish={dish} />
            ))}
          </ul>
        </>
      ) : (
        <p>Меню нет</p>
      )}

      {restaurant.reviews.length > 0 ? (
        <>
          <p>Отзывы:</p>
          <ul>
            {restaurant.reviews.map((review) => (
              <li key={review.id}>
                <p>Пользователь: {review.user}</p>
                <p>Отзыв: {review.text}</p>
                <p>Оценка: {review.rating}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Отзывов нет</p>
      )}
    </li>
  );
};
