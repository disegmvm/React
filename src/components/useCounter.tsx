import { useState } from "react";

export const useCounter = (min = 0, max = 5, initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increase = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  return {
    count,
    increase,
    decrease,
  };
};