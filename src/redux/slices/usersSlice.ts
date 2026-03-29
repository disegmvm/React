import { createSlice } from "@reduxjs/toolkit";
import { users as normalizedUsers } from "../../constants/normalizedMock";

const initialState = normalizedUsers;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
