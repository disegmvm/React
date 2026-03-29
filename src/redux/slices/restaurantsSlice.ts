import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { restaurantsApi } from "../../api/restaurantsApi";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import type { RestaurantEntity, RequestStatus } from "../../components/types";
import type { RootState } from "../store";

const restaurantsAdapter = createEntityAdapter<RestaurantEntity>();

type RestaurantsState = ReturnType<typeof restaurantsAdapter.getInitialState> & {
  listStatus: RequestStatus;
  listError: string | null;
  itemStatusById: Record<string, RequestStatus>;
  itemErrorById: Record<string, string | null>;
};

const initialState: RestaurantsState = restaurantsAdapter.getInitialState({
  listStatus: REQUEST_STATUS.idle,
  listError: null,
  itemStatusById: {},
  itemErrorById: {},
});

export const fetchRestaurants = createAsyncThunk<
  RestaurantEntity[],
  void,
  { state: RootState }
>(
  "restaurants/fetchRestaurants",
  async () => restaurantsApi.getRestaurants(),
  {
    condition: (_, { getState }) => {
      const state = getState();

      return (
        state.restaurants.ids.length === 0 &&
        state.restaurants.listStatus !== REQUEST_STATUS.pending
      );
    },
  },
);

export const fetchRestaurantById = createAsyncThunk<
  RestaurantEntity | null,
  string,
  { state: RootState }
>(
  "restaurants/fetchRestaurantById",
  async (restaurantId) => restaurantsApi.getRestaurantById(restaurantId),
  {
    condition: (restaurantId, { getState }) => {
      const state = getState();

      return (
        !state.restaurants.entities[restaurantId] &&
        state.restaurants.itemStatusById[restaurantId] !== REQUEST_STATUS.pending
      );
    },
  },
);

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.listStatus = REQUEST_STATUS.pending;
        state.listError = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.listStatus = REQUEST_STATUS.succeeded;
        restaurantsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.listStatus = REQUEST_STATUS.failed;
        state.listError = action.error.message ?? "Ошибка загрузки ресторанов";
      })
      .addCase(fetchRestaurantById.pending, (state, action) => {
        state.itemStatusById[action.meta.arg] = REQUEST_STATUS.pending;
        state.itemErrorById[action.meta.arg] = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        const restaurantId = action.meta.arg;
        state.itemStatusById[restaurantId] = REQUEST_STATUS.succeeded;

        if (action.payload) {
          restaurantsAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        const restaurantId = action.meta.arg;
        state.itemStatusById[restaurantId] = REQUEST_STATUS.failed;
        state.itemErrorById[restaurantId] =
          action.error.message ?? "Ошибка загрузки ресторана";
      });
  },
});

export const restaurantsReducer = restaurantsSlice.reducer;
export const restaurantsSelectors = restaurantsAdapter.getSelectors<RootState>(
  (state) => state.restaurants,
);
