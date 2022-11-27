import { Header } from "./components/Header/Header";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { PostPage } from "./pages/PostPage/PostPage";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import s from "./index.css";
import { AlbumsPage } from "./pages/AlbumsPage/AlbumsPage";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import { AlbumPage } from "./pages/AlbumPage/AlbumPage";
import { Slider } from "./components/Slider/Slider";
import { EditPost } from "./components/EditPost/EditPost";

export const App = (): JSX.Element | null => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className={s.layout}>
          <Routes>
            <Route index element={<Navigate to="posts" replace />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:postId" element={<PostPage />} />
            <Route path="posts/:postId/edit" element={<EditPost />} />
            <Route path="albums" element={<AlbumsPage />} />
            <Route path="albums/:albumId" element={<AlbumPage />} />
            <Route path="todos" element={<TodosPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Slider />
      </Provider>
    </BrowserRouter>
  );
};
