import type {
  DishEntity,
  NormalizedState,
  RestaurantEntity,
  ReviewEntity,
  UserType,
} from "../components/types";

export const users: NormalizedState<UserType> = {
  ids: ["user-antony", "user-sam", "user-diana", "user-lolly", "user-agata", "user-rebeca"],
  entities: {
    "user-antony": { id: "user-antony", name: "Antony" },
    "user-sam": { id: "user-sam", name: "Sam" },
    "user-diana": { id: "user-diana", name: "Diana" },
    "user-lolly": { id: "user-lolly", name: "Lolly" },
    "user-agata": { id: "user-agata", name: "Agata" },
    "user-rebeca": { id: "user-rebeca", name: "Rebeca" },
  },
};

export const dishes: NormalizedState<DishEntity> = {
  ids: [
    "d75f762a-eadd-49be-8918-ed0daa8dd024",
    "c3cb8f92-a2ed-4716-92a1-b6ea813e9049",
    "bd129641-c0eb-432b-84b6-8b81d2930358",
    "25402233-0095-49ea-9939-1e67ed89ffb9",
    "90902233-0095-49ea-9939-1e67ed89ffb9",
    "08c9ffa0-d003-4310-9e15-20978743296e",
    "64a4967c-2080-4a99-9074-4655a4569a95",
    "4bc8528e-26d1-46c3-a522-8e18d10c8c84",
    "6c02c2ce-b868-4191-b4a7-8686429f4bac",
    "99bb6fbb-e53b-4b7e-b9c2-23b63b77385d",
  ],
  entities: {
    "d75f762a-eadd-49be-8918-ed0daa8dd024": {
      id: "d75f762a-eadd-49be-8918-ed0daa8dd024",
      name: "Chicken tikka masala",
      price: 12,
      ingredients: ["chicken", "rice"],
    },
    "c3cb8f92-a2ed-4716-92a1-b6ea813e9049": {
      id: "c3cb8f92-a2ed-4716-92a1-b6ea813e9049",
      name: "Naan",
      price: 3,
      ingredients: ["bread"],
    },
    "bd129641-c0eb-432b-84b6-8b81d2930358": {
      id: "bd129641-c0eb-432b-84b6-8b81d2930358",
      name: "Samosa",
      price: 8,
      ingredients: ["chicken", "bread"],
    },
    "25402233-0095-49ea-9939-1e67ed89ffb9": {
      id: "25402233-0095-49ea-9939-1e67ed89ffb9",
      name: "Margarita",
      price: 9,
      ingredients: ["bread", "cheese", "tomatoes"],
    },
    "90902233-0095-49ea-9939-1e67ed89ffb9": {
      id: "90902233-0095-49ea-9939-1e67ed89ffb9",
      name: "Chef pizza",
      price: 10,
      ingredients: ["bread", "cheese", "tomatoes", "chicken"],
    },
    "08c9ffa0-d003-4310-9e15-20978743296e": {
      id: "08c9ffa0-d003-4310-9e15-20978743296e",
      name: "Cinnamon buns",
      price: 5,
      ingredients: ["bread"],
    },
    "64a4967c-2080-4a99-9074-4655a4569a95": {
      id: "64a4967c-2080-4a99-9074-4655a4569a95",
      name: "Semlor",
      price: 2,
      ingredients: ["bread", "cream"],
    },
    "4bc8528e-26d1-46c3-a522-8e18d10c8c84": {
      id: "4bc8528e-26d1-46c3-a522-8e18d10c8c84",
      name: "Saffron bun",
      price: 4,
      ingredients: ["bread"],
    },
    "6c02c2ce-b868-4191-b4a7-8686429f4bac": {
      id: "6c02c2ce-b868-4191-b4a7-8686429f4bac",
      name: "Flat Iron Steak",
      price: 10,
      ingredients: ["beef"],
    },
    "99bb6fbb-e53b-4b7e-b9c2-23b63b77385d": {
      id: "99bb6fbb-e53b-4b7e-b9c2-23b63b77385d",
      name: "Flat Iron Burger",
      price: 10,
      ingredients: ["bread", "beef"],
    },
  },
};

export const reviews: NormalizedState<ReviewEntity> = {
  ids: [
    "5909796d-5030-4e36-adec-68b8f9ec2d96",
    "429dea85-11dd-4054-a31e-c60c92e17255",
    "53b642d7-5e86-4717-a466-0640a1dee076",
    "c27ab88e-375c-4e98-aa94-8a180150a797",
    "abc0c5e1-cd57-4f0a-99d9-00e6b4533b3a",
    "fabrique-review-1",
    "5db6247b-ab1c-49db-be1f-8dd27fd38b81",
    "381b0c31-6360-43ff-80d1-581a116159d8",
  ],
  entities: {
    "5909796d-5030-4e36-adec-68b8f9ec2d96": {
      id: "5909796d-5030-4e36-adec-68b8f9ec2d96",
      userId: "user-antony",
      text: "Not bad",
      rating: 5,
    },
    "429dea85-11dd-4054-a31e-c60c92e17255": {
      id: "429dea85-11dd-4054-a31e-c60c92e17255",
      userId: "user-sam",
      text: "No burgers",
      rating: 3,
    },
    "53b642d7-5e86-4717-a466-0640a1dee076": {
      id: "53b642d7-5e86-4717-a466-0640a1dee076",
      userId: "user-diana",
      text: "Perfect Margarita",
      rating: 5,
    },
    "c27ab88e-375c-4e98-aa94-8a180150a797": {
      id: "c27ab88e-375c-4e98-aa94-8a180150a797",
      userId: "user-sam",
      text: "No burgers again. But Chef Pizza is the best one",
      rating: 4,
    },
    "abc0c5e1-cd57-4f0a-99d9-00e6b4533b3a": {
      id: "abc0c5e1-cd57-4f0a-99d9-00e6b4533b3a",
      userId: "user-lolly",
      text: "Good for lunch",
      rating: 5,
    },
    "fabrique-review-1": {
      id: "fabrique-review-1",
      userId: "user-agata",
      text: "Best bakery",
      rating: 5,
    },
    "5db6247b-ab1c-49db-be1f-8dd27fd38b81": {
      id: "5db6247b-ab1c-49db-be1f-8dd27fd38b81",
      userId: "user-sam",
      text: "Finally! This place is amazing place for breakfast, lunch, dinner and supper",
      rating: 5,
    },
    "381b0c31-6360-43ff-80d1-581a116159d8": {
      id: "381b0c31-6360-43ff-80d1-581a116159d8",
      userId: "user-rebeca",
      text: "Meat here is extremely delicious",
      rating: 5,
    },
  },
};

export const restaurants: NormalizedState<RestaurantEntity> = {
  ids: [
    "a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2",
    "bb8afbec-2fec-491f-93e9-7f13950dd80b",
    "982bfbce-c5e0-41a0-9f99-d5c20ecee49d",
    "d9241927-09e1-44f3-8986-a76346869037",
  ],
  entities: {
    "a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2": {
      id: "a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2",
      name: "Dishoom",
      menuIds: [
        "d75f762a-eadd-49be-8918-ed0daa8dd024",
        "c3cb8f92-a2ed-4716-92a1-b6ea813e9049",
        "bd129641-c0eb-432b-84b6-8b81d2930358",
      ],
      reviewIds: [
        "5909796d-5030-4e36-adec-68b8f9ec2d96",
        "429dea85-11dd-4054-a31e-c60c92e17255",
      ],
    },
    "bb8afbec-2fec-491f-93e9-7f13950dd80b": {
      id: "bb8afbec-2fec-491f-93e9-7f13950dd80b",
      name: "Homeslice",
      menuIds: [
        "25402233-0095-49ea-9939-1e67ed89ffb9",
        "90902233-0095-49ea-9939-1e67ed89ffb9",
      ],
      reviewIds: [
        "53b642d7-5e86-4717-a466-0640a1dee076",
        "c27ab88e-375c-4e98-aa94-8a180150a797",
        "abc0c5e1-cd57-4f0a-99d9-00e6b4533b3a",
      ],
    },
    "982bfbce-c5e0-41a0-9f99-d5c20ecee49d": {
      id: "982bfbce-c5e0-41a0-9f99-d5c20ecee49d",
      name: "Fabrique",
      menuIds: [
        "08c9ffa0-d003-4310-9e15-20978743296e",
        "64a4967c-2080-4a99-9074-4655a4569a95",
        "4bc8528e-26d1-46c3-a522-8e18d10c8c84",
      ],
      reviewIds: ["fabrique-review-1"],
    },
    "d9241927-09e1-44f3-8986-a76346869037": {
      id: "d9241927-09e1-44f3-8986-a76346869037",
      name: "Flat Iron",
      menuIds: [
        "6c02c2ce-b868-4191-b4a7-8686429f4bac",
        "99bb6fbb-e53b-4b7e-b9c2-23b63b77385d",
      ],
      reviewIds: [
        "5db6247b-ab1c-49db-be1f-8dd27fd38b81",
        "381b0c31-6360-43ff-80d1-581a116159d8",
      ],
    },
  },
};
