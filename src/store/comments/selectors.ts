import { IComment } from "./../../interfaces/index";
import { RootState } from "../index";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

type PostId = {
  postId: string | number;
};

export const selectCommentsModuleState = (state: RootState) => state.comments;

export const selectCommentsEntities = (state: RootState) =>
  selectCommentsModuleState(state).entities;

export const selectCommentsIds = (state: RootState) =>
  selectCommentsModuleState(state).ids;

export const selectCommentsStatus = (state: RootState) =>
  selectCommentsModuleState(state).status;

export const selectIsCommentLoading = (state: RootState) =>
  selectCommentsStatus(state) === LoadingStatuses.inProgress;

export const selectCommentsByPostId = (state: RootState, { postId }: PostId) =>
  Object.values(selectCommentsEntities(state)).filter(
    (comment) => comment?.postId === postId
  );

export const selectLoadedPostIds = (state: RootState) =>
  selectCommentsModuleState(state).postIds;

export const selectIsPostCommentsLoaded = (
  state: RootState,
  { postId }: PostId
) => selectLoadedPostIds(state).includes(postId);
