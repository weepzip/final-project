import { postSlice } from "./post/index";
import { photosSlice } from "./photos/index";
import { todosSlice } from "./todos/index";
import { albumsSlice } from "./albums/index";
import { commentsSlice } from "./comments/index";
import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    post: postSlice.reducer,
    comments: commentsSlice.reducer,
    albums: albumsSlice.reducer,
    todos: todosSlice.reducer,
    photos: photosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
