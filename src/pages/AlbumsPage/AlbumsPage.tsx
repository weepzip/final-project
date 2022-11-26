import { AlbumsList } from "../../components/AlbumsList/AlbumsList";
import React from "react";
import { Outlet } from "react-router-dom";

export const AlbumsPage = (): JSX.Element => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
