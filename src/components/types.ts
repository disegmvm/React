export type ReviewType = {
  id: string;
  user: string;
  text: string;
  rating: number;
};

export type DishType = {
  id: string;
  name: string;
  price: number;
  ingredients?: string[];
};

export type RestaurantType = {
  id: string;
  name: string;
  menu?: DishType[];
  reviews?: ReviewType[];
};