import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  [dishId: string]: number;
};

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItem(state, action: PayloadAction<string>) {
      const dishId = action.payload;
      const currentCount = state[dishId] ?? 0;

      state[dishId] = Math.min(currentCount + 1, 5);
    },
    decrementItem(state, action: PayloadAction<string>) {
      const dishId = action.payload;
      const currentCount = state[dishId] ?? 0;

      if (currentCount <= 1) {
        delete state[dishId];
        return;
      }

      state[dishId] = currentCount - 1;
    },
  },
});

export const { incrementItem, decrementItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
