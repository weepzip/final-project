import React, { useEffect } from "react";
import s from "./AlbumsList.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAlbums } from "../../store/albums";
import {
  selectAlbumsIds,
  selectIsAlbumsLoading,
} from "../../store/albums/selectors";
import { AlbumListItem } from "../AlbumListItem/AlbumListItem";

export const AlbumsList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAlbumsLoading);
  const albums = useAppSelector(selectAlbumsIds);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (!albums?.length) {
    return <div>Nothing</div>;
  }

  return (
    <div className={s.albums}>
      {albums.map((id) => (
        <AlbumListItem key={id} albumId={id} />
      ))}
    </div>
  );
};
