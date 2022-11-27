import React from "react";
import s from "./AlbumListItem.css";
import { useAppSelector } from "../../hooks";
import { selectAlbumById } from "../../store/albums/selectors";
import { NavLink } from "react-router-dom";

interface AlbumListItemProps {
  albumId: string | number;
}

export const AlbumListItem = ({
  albumId,
}: AlbumListItemProps): JSX.Element | null => {
  const album = useAppSelector((state) => selectAlbumById(state, { albumId }));

  if (!albumId || !album) {
    return null;
  }
  return (
    <NavLink to={`${albumId}`}>
      <div className={s.album}>{album.title}</div>
    </NavLink>
  );
};
