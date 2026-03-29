import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { restaurantsApi } from "../../api/restaurantsApi";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import type { DishEntity, RequestStatus } from "../../components/types";
import type { RootState } from "../store";

const dishesAdapter = createEntityAdapter<DishEntity>();

type DishesRequestState = {
  ids: string[];
  status: RequestStatus;
  error: string | null;
};

type DishesState = ReturnType<typeof dishesAdapter.getInitialState> & {
  byRestaurantId: Record<string, DishesRequestState>;
  itemStatusById: Record<string, RequestStatus>;
  itemErrorById: Record<string, string | null>;
};

const initialState: DishesState = dishesAdapter.getInitialState({
  byRestaurantId: {},
  itemStatusById: {},
  itemErrorById: {},
});

export const fetchDishesByRestaurantId = createAsyncThunk<
  { restaurantId: string; dishes: DishEntity[] },
  { restaurantId: string; force?: boolean },
  { state: RootState }
>(
  "dishes/fetchByRestaurantId",
  async ({ restaurantId }) => ({
    restaurantId,
    dishes: await restaurantsApi.getDishesByRestaurantId(restaurantId),
  }),
  {
    condition: ({ restaurantId, force }, { getState }) => {
      if (force) {
        return true;
      }

      const requestState = getState().dishes.byRestaurantId[restaurantId];

      return (
        !requestState ||
        (requestState.ids.length === 0 &&
          requestState.status !== REQUEST_STATUS.pending)
      );
    },
  },
);

export const fetchDishById = createAsyncThunk<
  DishEntity | null,
  string,
  { state: RootState }
>(
  "dishes/fetchDishById",
  async (dishId) => restaurantsApi.getDishById(dishId),
  {
    condition: (dishId, { getState }) => {
      const state = getState();

      return (
        !state.dishes.entities[dishId] &&
        state.dishes.itemStatusById[dishId] !== REQUEST_STATUS.pending
      );
    },
  },
);

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishesByRestaurantId.pending, (state, action) => {
        const { restaurantId } = action.meta.arg;
        state.byRestaurantId[restaurantId] = {
          ids: state.byRestaurantId[restaurantId]?.ids ?? [],
          status: REQUEST_STATUS.pending,
          error: null,
        };
      })
      .addCase(fetchDishesByRestaurantId.fulfilled, (state, action) => {
        const { restaurantId, dishes } = action.payload;
        dishesAdapter.upsertMany(state, dishes);
        state.byRestaurantId[restaurantId] = {
          ids: dishes.map((dish) => dish.id),
          status: REQUEST_STATUS.succeeded,
          error: null,
        };
      })
      .addCase(fetchDishesByRestaurantId.rejected, (state, action) => {
        const { restaurantId } = action.meta.arg;
        state.byRestaurantId[restaurantId] = {
          ids: state.byRestaurantId[restaurantId]?.ids ?? [],
          status: REQUEST_STATUS.failed,
          error: action.error.message ?? "Ошибка загрузки меню",
        };
      })
      .addCase(fetchDishById.pending, (state, action) => {
        state.itemStatusById[action.meta.arg] = REQUEST_STATUS.pending;
        state.itemErrorById[action.meta.arg] = null;
      })
      .addCase(fetchDishById.fulfilled, (state, action) => {
        const dishId = action.meta.arg;
        state.itemStatusById[dishId] = REQUEST_STATUS.succeeded;

        if (action.payload) {
          dishesAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(fetchDishById.rejected, (state, action) => {
        const dishId = action.meta.arg;
        state.itemStatusById[dishId] = REQUEST_STATUS.failed;
        state.itemErrorById[dishId] =
          action.error.message ?? "Ошибка загрузки блюда";
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const dishesSelectors = dishesAdapter.getSelectors<RootState>(
  (state) => state.dishes,
);
