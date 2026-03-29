import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Review } from "../../components/review/review";
import { ReviewForm } from "../../components/reviewForm/reviewForm";
import { useUser } from "../../components/userContext/userContext";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectReviewsByRestaurantId,
  selectReviewsRequestError,
  selectReviewsRequestStatus,
  selectUsersError,
  selectUsersStatus,
} from "../../redux/selectors";
import { fetchReviewsByRestaurantId } from "../../redux/slices/reviewsSlice";
import { fetchUsers } from "../../redux/slices/usersSlice";
import styles from "./reviewsPage.module.css";

export const ReviewsPage = () => {
  const { restaurantId = "" } = useParams();
  const dispatch = useAppDispatch();
  const { userId } = useUser();
  const [editedReviewId, setEditedReviewId] = useState<string | null>(null);
  const reviews = useAppSelector((state) =>
    selectReviewsByRestaurantId(state, restaurantId),
  );
  const reviewsStatus = useAppSelector((state) =>
    selectReviewsRequestStatus(state, restaurantId),
  );
  const reviewsError = useAppSelector((state) =>
    selectReviewsRequestError(state, restaurantId),
  );
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  useEffect(() => {
    if (restaurantId) {
      void dispatch(fetchReviewsByRestaurantId({ restaurantId }));
    }
    void dispatch(fetchUsers());
  }, [dispatch, restaurantId]);

  if (
    reviewsStatus === REQUEST_STATUS.pending ||
    usersStatus === REQUEST_STATUS.pending
  ) {
    return <p>Загружаем отзывы...</p>;
  }

  if (reviewsStatus === REQUEST_STATUS.failed) {
    return <p>{reviewsError ?? "Не удалось загрузить отзывы"}</p>;
  }

  if (usersStatus === REQUEST_STATUS.failed) {
    return <p>{usersError ?? "Не удалось загрузить пользователей"}</p>;
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
