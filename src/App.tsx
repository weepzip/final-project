import { Header } from "./components/Header/Header";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import s from "./index.css";

export const App = (): JSX.Element | null => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className={s.layout}>
          <Routes>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/albums" element={<div>Albums</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
};
