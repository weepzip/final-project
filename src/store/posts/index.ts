import { IPost } from "./../../interfaces/index";
import { RootState } from "./../index";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import axios from "axios";

type Entities = {
  [key: string | number]: IPost;
};

type PostsState = {
  status: string;
  ids: Array<string | number>;
  entities: Entities;
};

export const fetchPosts = createAsyncThunk<
  IPost[],
  undefined,
  { state: RootState; rejectValue: string }
>("posts/fetchPosts", async (_, { getState, rejectWithValue }) => {
  if (getState().posts.ids.length !== 0) {
    return rejectWithValue("Early loaded");
  }

  const response = await axios.get<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data, status } = response;

  if (status !== 200) {
    return rejectWithValue(`Error, response status: ${status.toString()}`);
  }

  console.log(data);

  return response.data as IPost[];
});

export const deletePost = createAsyncThunk<
  string | number,
  string | number,
  { rejectValue: string }
>("posts/deletePost", async (postId, { rejectWithValue }) => {
  if (!postId) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return postId;
});

const postsEntityAdapter = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
    deletingStatus: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsEntityAdapter.addMany(state, action.payload);

        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = LoadingStatuses.failed;
      })
      .addCase(deletePost.pending, (state) => {
        state.deletingStatus = LoadingStatuses.inProgress;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        postsEntityAdapter.removeOne(state, payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        if (payload) {
          state.deletingStatus = payload;
        }
      });
  },
});
