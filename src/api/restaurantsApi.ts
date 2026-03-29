import type {
  DishEntity,
  RestaurantEntity,
  ReviewEntity,
  UserType,
} from "../components/types";
import { request } from "./client";

export const restaurantsApi = {
  getRestaurants: () =>
    request<RestaurantEntity[]>("/restaurants", {
      errorMessage: "Не удалось загрузить рестораны",
    }),
  getRestaurantById: (restaurantId: string) =>
    request<RestaurantEntity | null>(`/restaurant/${restaurantId}`, {
      errorMessage: "Не удалось загрузить ресторан",
    }),
  getDishesByRestaurantId: (restaurantId: string) =>
    request<DishEntity[]>(`/dishes?restaurantId=${restaurantId}`, {
      errorMessage: "Не удалось загрузить меню",
    }),
  getDishById: (dishId: string) =>
    request<DishEntity | null>(`/dish/${dishId}`, {
      errorMessage: "Не удалось загрузить блюдо",
    }),
  getReviewsByRestaurantId: (restaurantId: string) =>
    request<ReviewEntity[]>(`/reviews?restaurantId=${restaurantId}`, {
      errorMessage: "Не удалось загрузить отзывы",
    }),
  getUsers: () =>
    request<UserType[]>("/users", {
      errorMessage: "Не удалось загрузить пользователей",
    }),
  addReview: ({
    restaurantId,
    userId,
    text,
    rating,
  }: {
    restaurantId: string;
    userId: string;
    text: string;
    rating: number;
  }) =>
    request<ReviewEntity>(`/review/${restaurantId}`, {
      method: "POST",
      body: JSON.stringify({ userId, text, rating }),
      errorMessage: "Не удалось отправить отзыв",
    }),
  updateReview: ({
    reviewId,
    userId,
    text,
    rating,
  }: {
    reviewId: string;
    userId: string;
    text: string;
    rating: number;
  }) =>
    request<ReviewEntity>(`/review/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify({ userId, text, rating }),
      errorMessage: "Не удалось обновить отзыв",
    }),
};
