import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "./../../interfaces/index";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { RootState } from "store";
import axios from "axios";

export const deletePost = createAsyncThunk<
  IPost,
  string | number,
  { state: RootState; rejectValue: string }
>("posts/deletePost", async (postId, { getState, rejectWithValue }) => {
  if (!postId) {
    return rejectWithValue("not id");
  }

  const response = await axios.delete<IPost>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(response.statusText);
  }

  return response.data as IPost;
});

interface PostState {
  status: string;
  error: null;
  post: IPost | null;
}
const initialState: PostState = {
  status: LoadingStatuses.idle,
  post: null,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
