import { useOutletContext } from "react-router";
import { Review } from "../../components/review/review";
import { ReviewForm } from "../../components/reviewForm/reviewForm";
import type { RestaurantType } from "../../components/types";
import styles from "./reviewsPage.module.css";

export const ReviewsPage = () => {
  const restaurant = useOutletContext<RestaurantType>();

  return (
    <div>
      {restaurant.reviews.length > 0 ? (
        <ul className={styles.list}>
          {restaurant.reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p>Отзывов нет</p>
      )}

      <ReviewForm />
    </div>
  );
};
