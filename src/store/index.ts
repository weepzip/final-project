import { commentsSlice } from "./comments/index";
import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
