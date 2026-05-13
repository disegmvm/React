import { useEffect, useReducer, type FC, type FormEvent } from "react";
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
} from "../../api/restaurantsApi";
import { Counter } from "../counter/counter";
import styles from "./reviewForm.module.css";
import { useUser } from "../userContext/userContext";

type ReviewFormState = {
  text: string;
  rating: number;
};

type ReviewFormAction =
  | { type: "setText"; payload: string }
  | { type: "increaseRating" }
  | { type: "decreaseRating" }
  | { type: "reset"; payload: ReviewFormState };

type ReviewFormProps = {
  restaurantId: string;
  reviewId?: string;
  initialText?: string;
  initialRating?: number;
  submitLabel?: string;
  onSubmitted?: VoidFunction;
  onCancel?: VoidFunction;
};

const reviewFormReducer = (
  state: ReviewFormState,
  action: ReviewFormAction,
): ReviewFormState => {
  switch (action.type) {
    case "setText":
      return {
        ...state,
        text: action.payload,
      };
    case "increaseRating":
      return {
        ...state,
        rating: state.rating < 5 ? state.rating + 1 : state.rating,
      };
    case "decreaseRating":
      return {
        ...state,
        rating: state.rating > 1 ? state.rating - 1 : state.rating,
      };
    case "reset":
      return action.payload;
    default:
      return state;
  }
};

export const ReviewForm: FC<ReviewFormProps> = ({
  restaurantId,
  reviewId,
  initialText = "",
  initialRating = 1,
  submitLabel = "Отправить отзыв",
  onSubmitted,
  onCancel,
}: ReviewFormProps) => {
  const [state, dispatch] = useReducer(reviewFormReducer, {
    text: initialText,
    rating: initialRating,
  });
  const { isAuthorized, userId, userName } = useUser();
  const [addReview, addReviewState] = useAddReviewMutation();
  const [updateReview, updateReviewState] = useUpdateReviewMutation();
  const isSubmitting = addReviewState.isLoading || updateReviewState.isLoading;
  const mutationError =
    ("error" in addReviewState && addReviewState.error && "status" in addReviewState.error
      ? "Не удалось отправить отзыв"
      : null) ??
    ("error" in updateReviewState && updateReviewState.error && "status" in updateReviewState.error
      ? "Не удалось обновить отзыв"
      : null);

  useEffect(() => {
    dispatch({
      type: "reset",
      payload: {
        text: initialText,
        rating: initialRating,
      },
    });
  }, [initialRating, initialText]);

  if (!isAuthorized || !userId) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.text.trim()) {
      return;
    }

    try {
      if (reviewId) {
        await updateReview({
          reviewId,
          restaurantId,
          userId,
          text: state.text.trim(),
          rating: state.rating,
        }).unwrap();
      } else {
        await addReview({
          restaurantId,
          userId,
          text: state.text.trim(),
          rating: state.rating,
        }).unwrap();
      }

      dispatch({
        type: "reset",
        payload: {
          text: "",
          rating: 1,
        },
      });
      onSubmitted?.();
    } catch {
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{reviewId ? "Изменить отзыв" : "Оставить отзыв"}</h3>

      <div className={styles.field}>
        <label>Пользователь</label>
        <input value={userName ?? ""} disabled />
      </div>

      <div className={styles.field}>
        <label htmlFor="review-text">Текст</label>
        <textarea
          id="review-text"
          value={state.text}
          onChange={(event) =>
            dispatch({
              type: "setText",
              payload: event.target.value,
            })
          }
        />
      </div>

      <div className={styles.field}>
        <p>Рейтинг</p>
        <Counter
          value={state.rating}
          onIncrease={() => dispatch({ type: "increaseRating" })}
          onDecrease={() => dispatch({ type: "decreaseRating" })}
          minValue={1}
          maxValue={5}
        />
      </div>

      {mutationError ? <p className={styles.error}>{mutationError}</p> : null}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.clearButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохраняем..." : submitLabel}
        </button>

        {onCancel ? (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Отмена
          </button>
        ) : null}
      </div>
    </form>
  );
};
