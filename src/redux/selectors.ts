import { createSelector } from "@reduxjs/toolkit";
import type { ReviewType } from "../components/types";
import type { RootState } from "./store";
import { dishesSelectors } from "./slices/dishesSlice";
import { restaurantsSelectors } from "./slices/restaurantsSlice";

const selectCartState = (state: RootState) => state.cart;
const selectDishesState = (state: RootState) => state.dishes;
const selectReviewsState = (state: RootState) => state.reviews;
const selectUsersState = (state: RootState) => state.users;
const selectRestaurantId = (_state: RootState, restaurantId: string) =>
  restaurantId;
const selectDishId = (_state: RootState, dishId: string) => dishId;

export const selectRestaurantTabs = createSelector(
  [restaurantsSelectors.selectAll],
  (restaurants) => restaurants.map(({ id, name }) => ({ id, name })),
);

export const selectRestaurantsListStatus = (state: RootState) =>
  state.restaurants.listStatus;

export const selectRestaurantsListError = (state: RootState) =>
  state.restaurants.listError;

export const selectRestaurantById = (state: RootState, restaurantId: string) =>
  restaurantsSelectors.selectById(state, restaurantId) ?? null;

export const selectRestaurantRequestStatus = (
  state: RootState,
  restaurantId: string,
) => state.restaurants.itemStatusById[restaurantId] ?? "idle";

export const selectRestaurantRequestError = (
  state: RootState,
  restaurantId: string,
) => state.restaurants.itemErrorById[restaurantId] ?? null;

export const selectDishesByRestaurantId = createSelector(
  [selectDishesState, selectRestaurantId],
  (dishesState, restaurantId) => {
    const dishIds = dishesState.byRestaurantId[restaurantId]?.ids ?? [];

    return dishIds
      .map((dishId) => dishesState.entities[dishId])
      .filter((dish) => dish !== undefined);
  },
);

export const selectDishesRequestStatus = (
  state: RootState,
  restaurantId: string,
) => state.dishes.byRestaurantId[restaurantId]?.status ?? "idle";

export const selectDishesRequestError = (
  state: RootState,
  restaurantId: string,
) => state.dishes.byRestaurantId[restaurantId]?.error ?? null;

export const selectDishById = createSelector(
  [selectDishId, dishesSelectors.selectEntities],
  (dishId, dishEntities) => dishEntities[dishId] ?? null,
);

export const selectDishRequestStatus = (state: RootState, dishId: string) =>
  state.dishes.itemStatusById[dishId] ?? "idle";

export const selectDishRequestError = (state: RootState, dishId: string) =>
  state.dishes.itemErrorById[dishId] ?? null;

export const selectReviewsByRestaurantId = createSelector(
  [selectReviewsState, selectUsersState, selectRestaurantId],
  (reviewsState, usersState, restaurantId) => {
    const reviewIds = reviewsState.byRestaurantId[restaurantId]?.ids ?? [];

    return reviewIds
      .map((reviewId) => {
        const review = reviewsState.entities[reviewId];

        if (!review) {
          return null;
        }

        const user = usersState.entities[review.userId];

        const result: ReviewType = {
          ...review,
          user: user?.name ?? "Unknown user",
        };

        return result;
      })
      .filter((review): review is ReviewType => review !== null);
  },
);

export const selectReviewsRequestStatus = (
  state: RootState,
  restaurantId: string,
) => state.reviews.byRestaurantId[restaurantId]?.status ?? "idle";

export const selectReviewsRequestError = (
  state: RootState,
  restaurantId: string,
) => state.reviews.byRestaurantId[restaurantId]?.error ?? null;

export const selectReviewMutationStatus = (state: RootState) =>
  state.reviews.mutationStatus;

export const selectReviewMutationError = (state: RootState) =>
  state.reviews.mutationError;

export const selectUsersStatus = (state: RootState) => state.users.status;

export const selectUsersError = (state: RootState) => state.users.error;

export const selectDishCountById = (state: RootState, dishId: string) =>
  state.cart[dishId] ?? 0;

export const selectCartSummary = createSelector(
  [selectCartState, dishesSelectors.selectEntities],
  (cartState, dishEntities) => {
    const items = Object.entries(cartState)
      .map(([dishId, quantity]) => {
        const dish = dishEntities[dishId];

        if (!dish || quantity <= 0) {
          return null;
        }

        return {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          quantity,
        };
      })
      .filter(
        (
          item,
        ): item is {
          id: string;
          name: string;
          price: number;
          quantity: number;
        } => item !== null,
      );

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
  },
);
