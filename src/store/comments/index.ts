import { selectIsPostCommentsLoaded } from "./selectors";
import axios from "axios";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { IComment } from "../../interfaces/index";
import { RootState } from "../index";

export const fetchComments = createAsyncThunk<
  IComment[],
  string | number,
  { state: RootState; rejectValue: string }
>("comments/fetchComments", async (postId, { getState, rejectWithValue }) => {
  if (selectIsPostCommentsLoaded(getState(), { postId })) {
    return rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await axios.get<IComment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as IComment[];
});

const commentsEntityAdapter = createEntityAdapter<IComment>();

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
    postIds: [] as Array<string | number>,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        commentsEntityAdapter.setMany(state, payload);
        state.status = LoadingStatuses.success;
        state.postIds.push(payload[0].postId);
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status = LoadingStatuses.failed;
      });
  },
});
