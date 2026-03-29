export type EntityMap<T> = Record<string, T>;

export type NormalizedState<T> = {
  ids: string[];
  entities: EntityMap<T>;
};

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

export type ReviewType = {
  id: string;
  user: string;
  text: string;
  rating: number;
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
  menuIds: string[];
  reviewIds: string[];
};

export type RestaurantType = {
  id: string;
  name: string;
  menu: DishType[];
  reviews: ReviewType[];
};
