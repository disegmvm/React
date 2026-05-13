import { useMemo, useState, type FC } from "react";
import { useParams } from "react-router";
import {
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
} from "../../api/restaurantsApi";
import { Review } from "../../components/review/review";
import { ReviewForm } from "../../components/reviewForm/reviewForm";
import { useUser } from "../../components/userContext/userContext";
import styles from "./reviewsPage.module.css";

export const ReviewsPage: FC = () => {
  const { restaurantId = "" } = useParams();
  const { userId } = useUser();
  const [editedReviewId, setEditedReviewId] = useState<string | null>(null);
  const {
    data: reviewsResponse = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    error: reviewsError,
  } = useGetReviewsByRestaurantIdQuery(restaurantId, {
    skip: !restaurantId,
  });
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetUsersQuery();
  const reviews = useMemo(
    () =>
      reviewsResponse.map((review) => ({
        ...review,
        user: users.find((user) => user.id === review.userId)?.name ?? "Unknown user",
      })),
    [reviewsResponse, users],
  );

  if (isReviewsLoading || isUsersLoading) {
    return <p>Загружаем отзывы...</p>;
  }

  if (isReviewsError) {
    return <p>{"status" in reviewsError ? "Не удалось загрузить отзывы" : reviewsError.message}</p>;
  }

  if (isUsersError) {
    return <p>{"status" in usersError ? "Не удалось загрузить пользователей" : usersError.message}</p>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.item}>
              <Review
                review={review}
                actionSlot={
                  review.userId === userId ? (
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() =>
                        setEditedReviewId((currentId) =>
                          currentId === review.id ? null : review.id,
                        )
                      }
                    >
                      {editedReviewId === review.id ? "Скрыть" : "Редактировать"}
                    </button>
                  ) : null
                }
              />

              {editedReviewId === review.id ? (
                <ReviewForm
                  restaurantId={restaurantId}
                  reviewId={review.id}
                  initialText={review.text}
                  initialRating={review.rating}
                  submitLabel="Сохранить"
                  onSubmitted={() => setEditedReviewId(null)}
                  onCancel={() => setEditedReviewId(null)}
                />
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>Отзывов нет</p>
      )}

      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};
