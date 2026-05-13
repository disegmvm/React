import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const selectCartState = (state: RootState) => state.cart;

export const selectDishCountById = (state: RootState, dishId: string) =>
  state.cart[dishId]?.quantity ?? 0;

export const selectCartSummary = createSelector([selectCartState], (cartState) => {
  const items = Object.values(cartState);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    items,
    totalItems,
    totalPrice,
  };
});
