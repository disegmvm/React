import { createSlice } from "@reduxjs/toolkit";
import { restaurants as normalizedRestaurants } from "../../constants/normalizedMock";

const initialState = normalizedRestaurants;

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
});

export const restaurantsReducer = restaurantsSlice.reducer;
