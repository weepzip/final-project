import { IPost } from "./../../interfaces/index";
import { RootState } from "./../index";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import axios from "axios";
import { clearNewPostForm } from "../post";

type Entities = {
  [key: string | number]: IPost;
};

export type PostCreate = {
  title: string;
  body: string;
  userId: string | number;
};

type PostCreateResponse = {
  body: PostCreate;
  id: string | number;
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

export const createPost = createAsyncThunk<
  IPost,
  void,
  { state: RootState; rejectValue: string }
>("post/createPost", async (_, { getState, rejectWithValue, dispatch }) => {
  const { newPost } = getState().post;

  const response = await axios.post<PostCreateResponse>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      body: newPost,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  if (response.status !== 201) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  dispatch(clearNewPostForm());

  return { ...response.data.body, id: response.data.id } as IPost;
});

const postsEntityAdapter = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
    creatingStatus: LoadingStatuses.idle,
    deletingStatus: LoadingStatuses.idle,
  }),
  reducers: {
    updatePostLocaly: (state, { payload }) => {
      console.log(payload);
      postsEntityAdapter.upsertOne(state, payload);
    },
  },
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
      })
      .addCase(createPost.pending, (state) => {
        state.creatingStatus = LoadingStatuses.inProgress;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        postsEntityAdapter.addOne(state, payload);
        state.creatingStatus = LoadingStatuses.success;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.creatingStatus = LoadingStatuses.failed;
      });
  },
});

export const { updatePostLocaly } = postsSlice.actions;
