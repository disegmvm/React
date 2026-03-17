import { Dish } from "./dish";
import { Review } from "./review";
import { ReviewForm } from "./reviewForm";
import type { RestaurantType } from "./types";
import styles from "./restaurant.module.css";

type RestaurantProps = {
  restaurant: RestaurantType;
};

export const Restaurant = ({ restaurant }: RestaurantProps) => {
  return (
    <li className={styles.restaurant}>
      <h2 className={styles.title}>{restaurant.name}</h2>

      <p className={styles.sectionTitle}>Меню:</p>
      {restaurant.menu && restaurant.menu.length > 0 ? (
        <ul className={styles.list}>
          {restaurant.menu.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </ul>
      ) : (
        <p>Меню отсутствует</p>
      )}

      <p className={styles.sectionTitle}>Отзывы:</p>
      {restaurant.reviews && restaurant.reviews.length > 0 ? (
        <ul className={styles.list}>
          {restaurant.reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p>Отзывов нет</p>
      )}

      <ReviewForm />
    </li>
  );
};