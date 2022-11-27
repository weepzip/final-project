import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { RootState } from "../index";

export type PostId = number | string;

export const selectPostsModule = (state: RootState) => state.posts;

export const selectPostsStatus = (state: RootState) =>
  selectPostsModule(state).status;

export const selectPostCreatingStatus = (state: RootState) =>
  selectPostsModule(state).creatingStatus;

export const selectPostDeletingStatus = (state: RootState) =>
  selectPostsModule(state).deletingStatus;

export const selectIsPostFetching = (state: RootState) =>
  selectPostsStatus(state) === LoadingStatuses.inProgress;

export const selectIsPostCreating = (state: RootState) =>
  selectPostCreatingStatus(state) === LoadingStatuses.inProgress;

export const selectIsPostDeleting = (state: RootState) =>
  selectPostDeletingStatus(state) === LoadingStatuses.inProgress;

export const selectPostsEntities = (state: RootState) =>
  selectPostsModule(state).entities;

export const selectPostById = (
  state: RootState,
  { postId }: { postId: PostId }
) => selectPostsEntities(state)[postId];

export const selectPostsIds = (state: RootState) =>
  selectPostsModule(state).ids;
