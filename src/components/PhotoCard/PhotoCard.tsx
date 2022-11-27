import { useAppDispatch, useAppSelector } from "../../hooks";
import React from "react";
import { selectPhotoById } from "../../store/photos/selectors";
import { setCurrentPhotoId, toggleSlider } from "../../store/photos";
import s from "./PhotoCard.css";

interface PhotoCardProps {
  photoId: string | number;
}
export const PhotoCard = ({ photoId }: PhotoCardProps): JSX.Element | null => {
  const photo = useAppSelector((state) => selectPhotoById(state, { photoId }));
  const dispatch = useAppDispatch();

  if (!photo) {
    return null;
  }

  const handleClick = () => {
    dispatch(setCurrentPhotoId(photoId));
    dispatch(toggleSlider());
  };

  return (
    <div className={s.card} onClick={handleClick}>
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <div className={s.hover}>{photo.title}</div>
    </div>
  );
};
