import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { RootState } from "../index";

export type PostId = number | string;

export const selectPostsModule = (state: RootState) => state.posts;

export const selectPostsStatus = (state: RootState) =>
  selectPostsModule(state).status;

export const selectIsPostFetching = (state: RootState) =>
  selectPostsStatus(state) === LoadingStatuses.inProgress;

export const selectPostsEntities = (state: RootState) =>
  selectPostsModule(state).entities;

export const selectPostById = (
  state: RootState,
  { postId }: { postId: PostId }
) => selectPostsEntities(state)[postId];

export const selectPostsIds = (state: RootState) =>
  selectPostsModule(state).ids;
