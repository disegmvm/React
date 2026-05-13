export type RequestStatus = "idle" | "pending" | "succeeded" | "failed";

export type UserType = {
  id: string;
  name: string;
};

export type ReviewEntity = {
  id: string;
  userId: string;
  text: string;
  rating: number;
};

export type ReviewType = ReviewEntity & {
  user: string;
};

export type DishEntity = {
  id: string;
  name: string;
  price: number;
  ingredients?: string[];
};

export type DishType = {
  id: string;
  name: string;
  price: number;
  ingredients?: string[];
};

export type RestaurantEntity = {
  id: string;
  name: string;
  description?: string;
  cuisine?: string;
  format?: string;
  averageCheck?: string;
};

export type RestaurantType = RestaurantEntity;
