import type { FC, ReactNode } from "react";
import type { ReviewType } from "../types";
import styles from "./review.module.css";

type ReviewProps = {
  review: ReviewType;
  actionSlot?: ReactNode;
};

export const Review: FC<ReviewProps> = ({ review, actionSlot }) => {
  return (
    <li className={styles.review}>
      <div className={styles.header}>
        <p>Пользователь: {review.user}</p>
        {actionSlot}
      </div>
      <p>Отзыв: {review.text}</p>
      <p>Оценка: {review.rating}</p>
    </li>
  );
};
