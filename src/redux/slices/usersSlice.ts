import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { restaurantsApi } from "../../api/restaurantsApi";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import type { RequestStatus, UserType } from "../../components/types";
import type { RootState } from "../store";

const usersAdapter = createEntityAdapter<UserType>();

type UsersState = ReturnType<typeof usersAdapter.getInitialState> & {
  status: RequestStatus;
  error: string | null;
};

const initialState: UsersState = usersAdapter.getInitialState({
  status: REQUEST_STATUS.idle,
  error: null,
});

export const fetchUsers = createAsyncThunk<UserType[], void, { state: RootState }>(
  "users/fetchUsers",
  async () => restaurantsApi.getUsers(),
  {
    condition: (_, { getState }) => {
      const state = getState();

      return (
        state.users.ids.length === 0 && state.users.status !== REQUEST_STATUS.pending
      );
    },
  },
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = REQUEST_STATUS.pending;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.succeeded;
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = REQUEST_STATUS.failed;
        state.error = action.error.message ?? "Ошибка загрузки пользователей";
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
);
