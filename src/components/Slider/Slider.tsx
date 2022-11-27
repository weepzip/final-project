import { IPhoto } from "../../interfaces";
import React from "react";
import s from "./Slider.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectCurrentPhotoId,
  selectIsSliderOpened,
  selectPhotoById,
  selectPhotosIds,
} from "../../store/photos/selectors";
import { Wrapper } from "../Wrapper/Wrapper";
import { setCurrentPhotoId } from "../../store/photos";

interface SliderProps {
  isOpened?: boolean;
  photoIds?: IPhoto[];
  currentPhotoId: string | number;
}

export const Slider = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(selectIsSliderOpened);
  const photoIds = useAppSelector(selectPhotosIds);
  const currentPhotoId = useAppSelector(selectCurrentPhotoId);
  const currentPhotoIndex = photoIds.indexOf(currentPhotoId) | 0;

  console.log(currentPhotoId, currentPhotoIndex);

  const photo = useAppSelector((state) =>
    selectPhotoById(state, {
      photoId: currentPhotoId,
    })
  );

  if (!isOpened || !photoIds.length) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { classList } = e.currentTarget;

    if (classList.contains(s.back) && currentPhotoIndex > 0) {
      dispatch(setCurrentPhotoId(photoIds[currentPhotoIndex - 1]));
    }

    if (
      classList.contains(s.forward) &&
      currentPhotoIndex < photoIds.length - 1
    ) {
      dispatch(setCurrentPhotoId(photoIds[currentPhotoIndex + 1]));
    }

    e.stopPropagation();
  };

  return (
    <Wrapper>
      {!photo ? (
        <div>Loading error</div>
      ) : (
        <div className={s.container}>
          <img src={photo.url} alt={photo.title} />
          <div className={s.back} onClick={handleClick}>
            {"<"}
          </div>
          <div className={s.forward} onClick={handleClick}>
            {">"}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
