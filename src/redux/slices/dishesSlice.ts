import { createSlice } from "@reduxjs/toolkit";
import { dishes as normalizedDishes } from "../../constants/normalizedMock";

const initialState = normalizedDishes;

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
});

export const dishesReducer = dishesSlice.reducer;
