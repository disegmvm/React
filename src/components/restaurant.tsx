export const Restaurant = ({ restaurant }) => {
  return (
    <li>
      <h2>{restaurant.name}</h2>

      <p>Меню:</p>
      <ul>
        {restaurant.menu.map((dish) => (
          <li>
            <p>Название: {dish.name}</p>
            <p>Цена: {dish.price}</p>
            <p>Ингредиенты: {dish.ingredients.join(", ")}</p>
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
  );
};