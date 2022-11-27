import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { selectAlbumById } from "../../store/albums/selectors";
import { fetchPhotos } from "../../store/photos";
import {
  selectIsPhotosLoading,
  selectPhotosIds,
} from "../../store/photos/selectors";
import { PhotoCard } from "../../components/PhotoCard/PhotoCard";
import s from "./AlbumPage.css";
import { fetchAlbum } from "../../store/albums";
import { Wrapper } from "../../components/Wrapper/Wrapper";

export const AlbumPage = (): JSX.Element => {
  const { albumId = "" } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsPhotosLoading);
  const photos = useAppSelector(selectPhotosIds);
  const album = useAppSelector((state) => selectAlbumById(state, { albumId }));

  useEffect(() => {
    dispatch(fetchAlbum(albumId));
    dispatch(fetchPhotos(albumId ? albumId : ""));
  }, [albumId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.album}>
      <h2>{album?.title}</h2>
      <div className={s.container}>
        {photos.map((photoId) => (
          <PhotoCard key={photoId} photoId={photoId} />
        ))}
      </div>
    </div>
  );
};
