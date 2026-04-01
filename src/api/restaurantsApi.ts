import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DishEntity,
  RestaurantEntity,
  ReviewEntity,
  UserType,
} from "../components/types";

const API_BASE_URL = "http://127.0.0.1:3001/api";

export const restaurantsApi = createApi({
  reducerPath: "restaurantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Restaurant", "Dish", "Review", "User"],
  endpoints: (build) => ({
    getRestaurants: build.query<RestaurantEntity[], void>({
      query: () => "/restaurants",
      providesTags: (result) =>
        result
          ? [
              ...result.map((restaurant) => ({
                type: "Restaurant" as const,
                id: restaurant.id,
              })),
              { type: "Restaurant" as const, id: "LIST" },
            ]
          : [{ type: "Restaurant" as const, id: "LIST" }],
    }),
    getRestaurantById: build.query<RestaurantEntity | null, string>({
      query: (restaurantId) => `/restaurant/${restaurantId}`,
      providesTags: (_result, _error, restaurantId) => [
        { type: "Restaurant", id: restaurantId },
      ],
    }),
    getDishesByRestaurantId: build.query<DishEntity[], string>({
      query: (restaurantId) => `/dishes?restaurantId=${restaurantId}`,
      providesTags: (result, _error, restaurantId) =>
        result
          ? [
              ...result.map((dish) => ({ type: "Dish" as const, id: dish.id })),
              { type: "Dish" as const, id: `LIST-${restaurantId}` },
            ]
          : [{ type: "Dish" as const, id: `LIST-${restaurantId}` }],
    }),
    getDishById: build.query<DishEntity | null, string>({
      query: (dishId) => `/dish/${dishId}`,
      providesTags: (_result, _error, dishId) => [{ type: "Dish", id: dishId }],
    }),
    getReviewsByRestaurantId: build.query<ReviewEntity[], string>({
      query: (restaurantId) => `/reviews?restaurantId=${restaurantId}`,
      providesTags: (result, _error, restaurantId) =>
        result
          ? [
              ...result.map((review) => ({
                type: "Review" as const,
                id: review.id,
              })),
              { type: "Review" as const, id: `LIST-${restaurantId}` },
            ]
          : [{ type: "Review" as const, id: `LIST-${restaurantId}` }],
    }),
    getUsers: build.query<UserType[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map((user) => ({ type: "User" as const, id: user.id })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    addReview: build.mutation<
      ReviewEntity,
      { restaurantId: string; userId: string; text: string; rating: number }
    >({
      query: ({ restaurantId, ...body }) => ({
        url: `/review/${restaurantId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { restaurantId }) => [
        { type: "Review", id: `LIST-${restaurantId}` },
      ],
    }),
    updateReview: build.mutation<
      ReviewEntity,
      {
        reviewId: string;
        restaurantId: string;
        userId: string;
        text: string;
        rating: number;
      }
    >({
      query: ({ reviewId, restaurantId: _restaurantId, ...body }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { restaurantId, reviewId }) => [
        { type: "Review", id: reviewId },
        { type: "Review", id: `LIST-${restaurantId}` },
      ],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetDishByIdQuery,
  useGetDishesByRestaurantIdQuery,
  useGetRestaurantByIdQuery,
  useGetRestaurantsQuery,
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
  useUpdateReviewMutation,
} = restaurantsApi;
