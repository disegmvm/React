import classNames from "classnames";
import type { FC } from "react";
import styles from "./counter.module.css";

type CounterProps = {
  value: number;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
  minValue: number;
  maxValue: number;
};

export const Counter: FC<CounterProps> = ({
  value,
  onIncrease,
  onDecrease,
  minValue,
  maxValue,
}: CounterProps) => {
  return (
    <div className={styles.counter}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= minValue}
        className={classNames(styles.button, {
          [styles.disabledButton]: value <= minValue,
        })}
      >
        -
      </button>

      <span className={styles.value}>{value}</span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={value >= maxValue}
        className={classNames(styles.button, {
          [styles.disabledButton]: value >= maxValue,
        })}
      >
        +
      </button>
    </div>
  );
};
