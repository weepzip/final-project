import { PostCreate, updatePostLocaly } from "./../posts/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "./../../interfaces/index";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { RootState } from "../index";
import axios from "axios";

type PostState = {
  status: string;
  post: IPost | null;
  newPost: PostCreate;
  editingPost: IPost | null;
};

const initialState: PostState = {
  status: LoadingStatuses.idle,
  post: null,
  newPost: {
    title: "",
    body: "",
    userId: 1,
  },
  editingPost: null,
};

export const fetchPost = createAsyncThunk<
  IPost,
  string | number,
  { rejectValue: string }
>("post/fetchPost", async (postId, { rejectWithValue }) => {
  const response = await axios.get<IPost>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as IPost;
});

type PutPost = {
  data: {
    body: IPost;
  };
};

export const updatePost = createAsyncThunk<
  IPost,
  void,
  { state: RootState; rejectValue: string }
>("post/updatePost", async (_, { getState, rejectWithValue, dispatch }) => {
  const editingPost = getState().post.editingPost;

  if (!editingPost) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  const response = await axios.put<PutPost>(
    `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
    {
      body: editingPost,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  dispatch(updatePostLocaly(response.data.body as IPost));

  return response.data.body as IPost;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setNewPostData: (state, { payload }) => {
      state.newPost = { ...payload };
    },
    clearNewPostForm: (state) => {
      state.newPost.body = "";
      state.newPost.title = "";
    },
    setEditingPostData: (state, { payload }) => {
      state.editingPost = { ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.editingPost = payload;
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPost.rejected, (state, { payload }) => {
        state.status = LoadingStatuses.failed;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.editingPost = payload;
        state.status = LoadingStatuses.success;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.status = LoadingStatuses.failed;
      });
  },
});

export const { clearNewPostForm, setNewPostData, setEditingPostData } =
  postSlice.actions;
