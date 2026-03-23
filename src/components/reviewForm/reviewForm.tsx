import { useReducer } from "react";
import { Counter } from "../counter/counter";
import styles from "./reviewForm.module.css";

const INITIAL_STATE = {
  name: "",
  text: "",
  rating: 1,
};

type State = {
  name: string;
  text: string;
  rating: number;
};

type Action = { type: "setName"; payload: string } | { type: "addComment"; payload: string } | { type: "increaseRating" } | { type: "decreaseRating" } | { type: "clear" };

const reviewFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };

    case "addComment":
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

    case "clear":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const ReviewForm = () => {
  const [state, dispatch] = useReducer(reviewFormReducer, INITIAL_STATE);

  return (
    <form className={styles.form}>
      <h3>Оставить отзыв</h3>

      <div className={styles.field}>
        <label>Имя</label>
        <input
          id="review-name"
          type="text"
          value={state.name}
          onChange={(event) =>
            dispatch({
              type: "setName",
              payload: event.target.value,
            })
          }
        />
      </div>

      <div className={styles.field}>
        <label>Текст</label>
        <textarea
          id="review-text"
          value={state.text}
          onChange={(event) =>
            dispatch({
              type: "addComment",
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

      <button
        type="button"
        className={styles.clearButton}
        onClick={() => dispatch({ type: "clear" })}
      >
        Clear
      </button>
    </form>
  );
};