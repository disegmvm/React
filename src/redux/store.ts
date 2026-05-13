import { configureStore } from "@reduxjs/toolkit";
import { restaurantsApi } from "../api/restaurantsApi";
import { cartReducer } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantsApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
