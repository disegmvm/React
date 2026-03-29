import { createSlice } from "@reduxjs/toolkit";
import { reviews as normalizedReviews } from "../../constants/normalizedMock";

const initialState = normalizedReviews;

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
});

export const reviewsReducer = reviewsSlice.reducer;
