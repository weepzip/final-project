import { IComment } from "./../../interfaces/index";
import { RootState } from "../index";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

type CommentId = {
  commentId: string | number;
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

export const selectCommentById = (state: RootState, { commentId }: CommentId) =>
  selectCommentsEntities(state)[commentId];

export const selectRawComments = (state: RootState) =>
  selectCommentsModuleState(state).raw;
