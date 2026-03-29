import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  isReady: boolean;
};

const initialState: AppState = {
  isReady: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const appReducer = appSlice.reducer;
