import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { restaurantsApi } from "../../api/restaurantsApi";
import { REQUEST_STATUS } from "../../constants/requestStatus";
import type { RequestStatus, ReviewEntity } from "../../components/types";
import type { AppDispatch, RootState } from "../store";

const reviewsAdapter = createEntityAdapter<ReviewEntity>();

type ReviewsRequestState = {
  ids: string[];
  status: RequestStatus;
  error: string | null;
};

type ReviewsState = ReturnType<typeof reviewsAdapter.getInitialState> & {
  byRestaurantId: Record<string, ReviewsRequestState>;
  mutationStatus: RequestStatus;
  mutationError: string | null;
};

const initialState: ReviewsState = reviewsAdapter.getInitialState({
  byRestaurantId: {},
  mutationStatus: REQUEST_STATUS.idle,
  mutationError: null,
});

export const fetchReviewsByRestaurantId = createAsyncThunk<
  { restaurantId: string; reviews: ReviewEntity[] },
  { restaurantId: string; force?: boolean },
  { state: RootState }
>(
  "reviews/fetchByRestaurantId",
  async ({ restaurantId }) => ({
    restaurantId,
    reviews: await restaurantsApi.getReviewsByRestaurantId(restaurantId),
  }),
  {
    condition: ({ restaurantId, force }, { getState }) => {
      if (force) {
        return true;
      }

      const requestState = getState().reviews.byRestaurantId[restaurantId];

      return (
        !requestState ||
        (requestState.ids.length === 0 &&
          requestState.status !== REQUEST_STATUS.pending)
      );
    },
  },
);

export const addReview = createAsyncThunk<
  void,
  { restaurantId: string; userId: string; text: string; rating: number },
  { dispatch: AppDispatch }
>("reviews/addReview", async ({ restaurantId, userId, text, rating }, { dispatch }) => {
  await restaurantsApi.addReview({ restaurantId, userId, text, rating });
  await dispatch(fetchReviewsByRestaurantId({ restaurantId, force: true }));
});

export const updateReview = createAsyncThunk<
  void,
  {
    reviewId: string;
    restaurantId: string;
    userId: string;
    text: string;
    rating: number;
  },
  { dispatch: AppDispatch }
>(
  "reviews/updateReview",
  async ({ reviewId, restaurantId, userId, text, rating }, { dispatch }) => {
    await restaurantsApi.updateReview({ reviewId, userId, text, rating });
    await dispatch(fetchReviewsByRestaurantId({ restaurantId, force: true }));
  },
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByRestaurantId.pending, (state, action) => {
        const { restaurantId } = action.meta.arg;
        state.byRestaurantId[restaurantId] = {
          ids: state.byRestaurantId[restaurantId]?.ids ?? [],
          status: REQUEST_STATUS.pending,
          error: null,
        };
      })
      .addCase(fetchReviewsByRestaurantId.fulfilled, (state, action) => {
        const { restaurantId, reviews } = action.payload;
        reviewsAdapter.upsertMany(state, reviews);
        state.byRestaurantId[restaurantId] = {
          ids: reviews.map((review) => review.id),
          status: REQUEST_STATUS.succeeded,
          error: null,
        };
      })
      .addCase(fetchReviewsByRestaurantId.rejected, (state, action) => {
        const { restaurantId } = action.meta.arg;
        state.byRestaurantId[restaurantId] = {
          ids: state.byRestaurantId[restaurantId]?.ids ?? [],
          status: REQUEST_STATUS.failed,
          error: action.error.message ?? "Ошибка загрузки отзывов",
        };
      })
      .addCase(addReview.pending, (state) => {
        state.mutationStatus = REQUEST_STATUS.pending;
        state.mutationError = null;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.mutationStatus = REQUEST_STATUS.succeeded;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.mutationStatus = REQUEST_STATUS.failed;
        state.mutationError = action.error.message ?? "Ошибка отправки отзыва";
      })
      .addCase(updateReview.pending, (state) => {
        state.mutationStatus = REQUEST_STATUS.pending;
        state.mutationError = null;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.mutationStatus = REQUEST_STATUS.succeeded;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.mutationStatus = REQUEST_STATUS.failed;
        state.mutationError = action.error.message ?? "Ошибка обновления отзыва";
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
export const reviewsSelectors = reviewsAdapter.getSelectors<RootState>(
  (state) => state.reviews,
);
