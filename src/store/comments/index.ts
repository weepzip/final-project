import { IComment } from "./../../interfaces/index";
import axios from "axios";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../index";

export const fetchComments = createAsyncThunk<
  IComment[],
  string | number,
  { state: RootState; rejectValue: string }
>("comments/fetchComments", async (postId, { getState, rejectWithValue }) => {
  const response = await axios.get<IComment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  // primitive try to create replied comments
  const getRandom = (num: number) => Math.ceil(Math.random() * (num - 1));

  for (const comment of response.data) {
    const count = getRandom(response.data.length);
    comment.reply = [] as number[];

    for (let i = 0; i <= count; i++) {
      const random =
        Number(comment.postId) * 5 - getRandom(response.data.length);
      comment.reply.push(random);
    }
  }
  // =======

  return response.data as IComment[];
});

const commentsEntityAdapter = createEntityAdapter<IComment>();

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
    raw: [] as IComment[],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        commentsEntityAdapter.removeAll(state);
        commentsEntityAdapter.setMany(state, payload);
        state.status = LoadingStatuses.success;
        state.raw = [...payload];
      })
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status = LoadingStatuses.failed;
      });
  },
});
