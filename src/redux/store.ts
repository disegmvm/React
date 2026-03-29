import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { cartReducer } from "./slices/cartSlice";
import { dishesReducer } from "./slices/dishesSlice";
import { restaurantsReducer } from "./slices/restaurantsSlice";
import { reviewsReducer } from "./slices/reviewsSlice";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
