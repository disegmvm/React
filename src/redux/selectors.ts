import { createSelector } from "@reduxjs/toolkit";
import type { DishType, RestaurantType, ReviewType } from "../components/types";
import type { RootState } from "./store";

const selectCartState = (state: RootState) => state.cart;
const selectRestaurantState = (state: RootState) => state.restaurants;
const selectDishState = (state: RootState) => state.dishes;
const selectReviewState = (state: RootState) => state.reviews;
const selectUserState = (state: RootState) => state.users;
const selectRestaurantId = (_state: RootState, restaurantId: string) =>
  restaurantId;
const selectDishId = (_state: RootState, dishId: string) => dishId;

const getReviewView = (
  reviewId: string,
  state: Pick<RootState, "reviews" | "users">,
): ReviewType | null => {
  const review = state.reviews.entities[reviewId];

  if (!review) {
    return null;
  }

  return {
    id: review.id,
    user: state.users.entities[review.userId]?.name ?? "Unknown user",
    text: review.text,
    rating: review.rating,
  };
};

const getDishView = (
  dishId: string,
  state: Pick<RootState, "dishes">,
): DishType | null => {
  const dish = state.dishes.entities[dishId];

  if (!dish) {
    return null;
  }

  return {
    id: dish.id,
    name: dish.name,
    price: dish.price,
    ingredients: dish.ingredients,
  };
};

const getRestaurantView = (
  restaurantId: string,
  state: Pick<RootState, "restaurants" | "dishes" | "reviews" | "users">,
): RestaurantType | null => {
  const restaurant = state.restaurants.entities[restaurantId];

  if (!restaurant) {
    return null;
  }

  return {
    id: restaurant.id,
    name: restaurant.name,
    menu: restaurant.menuIds
      .map((dishId: string) => getDishView(dishId, state))
      .filter((dish): dish is DishType => dish !== null),
    reviews: restaurant.reviewIds
      .map((reviewId: string) => getReviewView(reviewId, state))
      .filter((review): review is ReviewType => review !== null),
  };
};

export const selectRestaurants = createSelector(
  [
    selectRestaurantState,
    selectDishState,
    selectReviewState,
    selectUserState,
  ],
  (restaurantsState, dishesState, reviewsState, usersState) =>
    restaurantsState.ids
      .map((restaurantId) =>
        getRestaurantView(restaurantId, {
          restaurants: restaurantsState,
          dishes: dishesState,
          reviews: reviewsState,
          users: usersState,
        }),
      )
      .filter((restaurant): restaurant is RestaurantType => restaurant !== null),
);

export const selectRestaurantTabs = createSelector(
  [selectRestaurantState],
  (restaurantsState) =>
    restaurantsState.ids
      .map((restaurantId) => restaurantsState.entities[restaurantId])
      .filter(
        (
          restaurant,
        ): restaurant is {
          id: string;
          name: string;
          menuIds: string[];
          reviewIds: string[];
        } => restaurant !== undefined,
      )
      .map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
      })),
);

export const selectRestaurantById = createSelector(
  [
    selectRestaurantState,
    selectDishState,
    selectReviewState,
    selectUserState,
    selectRestaurantId,
  ],
  (
    restaurantsState,
    dishesState,
    reviewsState,
    usersState,
    restaurantId,
  ) =>
    getRestaurantView(restaurantId, {
      restaurants: restaurantsState,
      dishes: dishesState,
      reviews: reviewsState,
      users: usersState,
    }),
);

export const selectDishById = createSelector(
  [selectDishState, selectDishId],
  (dishesState, dishId) => getDishView(dishId, { dishes: dishesState }),
);

export const selectDishCountById = (state: RootState, dishId: string) =>
  state.cart[dishId] ?? 0;

export const selectCartSummary = createSelector(
  [selectCartState, selectDishState],
  (cartState, dishesState) => {
    const items = Object.entries(cartState)
      .map(([dishId, quantity]) => {
        const dish = dishesState.entities[dishId];

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
