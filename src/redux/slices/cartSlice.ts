import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = Record<string, CartItem>;

type AddCartItemPayload = {
  id: string;
  name: string;
  price: number;
};

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItem(state, action: PayloadAction<AddCartItemPayload>) {
      const { id, name, price } = action.payload;
      const currentItem = state[id];

      if (!currentItem) {
        state[id] = {
          id,
          name,
          price,
          quantity: 1,
        };
        return;
      }

      currentItem.quantity = Math.min(currentItem.quantity + 1, 5);
    },
    decrementItem(state, action: PayloadAction<string>) {
      const dishId = action.payload;
      const currentItem = state[dishId];

      if (!currentItem) {
        return;
      }

      if (currentItem.quantity <= 1) {
        delete state[dishId];
        return;
      }

      currentItem.quantity -= 1;
    },
  },
});

export const { incrementItem, decrementItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
