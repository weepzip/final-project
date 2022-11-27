import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { RootState } from "./../index";

type AlbumId = { albumId: string | number };
type PhotoId = { photoId: string | number };

export const selectPhotosModuleState = (state: RootState) => state.photos;

export const selectPhotosEntities = (state: RootState) =>
  selectPhotosModuleState(state).entities;

export const selectPhotosIds = (state: RootState) =>
  selectPhotosModuleState(state).ids;

export const selectPhotosStatus = (state: RootState) =>
  selectPhotosModuleState(state).status;

export const selectIsPhotosLoading = (state: RootState) =>
  selectPhotosStatus(state) === LoadingStatuses.inProgress;

export const selectPhotosAlbumId = (state: RootState) =>
  selectPhotosModuleState(state).albumId;

export const selectPhotoById = (state: RootState, { photoId }: PhotoId) =>
  selectPhotosEntities(state)[photoId];

export const selectIsSliderOpened = (state: RootState) =>
  selectPhotosModuleState(state).sliderIsOpened;

export const selectCurrentPhotoId = (state: RootState) =>
  selectPhotosModuleState(state).currentPhotoId;
