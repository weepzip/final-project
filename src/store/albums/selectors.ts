import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { RootState } from "./../index";

type AlbumId = {
  albumId: string | number;
};

export const selectAlbumsModuleState = (state: RootState) => state.albums;

export const selectAlbumsIds = (state: RootState) =>
  selectAlbumsModuleState(state).ids;

export const selectAlbumsEntities = (state: RootState) =>
  selectAlbumsModuleState(state).entities;

export const selectAlbumsStatus = (state: RootState) =>
  selectAlbumsModuleState(state).status;

export const selectIsAlbumsLoading = (state: RootState) =>
  selectAlbumsStatus(state) === LoadingStatuses.inProgress;

export const selectAlbumById = (state: RootState, { albumId }: AlbumId) =>
  selectAlbumsEntities(state)[albumId];
