import type { ReviewType } from "../types";
import styles from "./review.module.css";

type ReviewProps = {
  review: ReviewType;
};

export const Review = ({ review }: ReviewProps) => {
  return (
    <li className={styles.review}>
      <p>Пользователь: {review.user}</p>
      <p>Отзыв: {review.text}</p>
      <p>Оценка: {review.rating}</p>
    </li>
  );
};