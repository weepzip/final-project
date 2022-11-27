import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { RootState } from "./../index";

export const selectPostModuleState = (state: RootState) => state.post;

export const selectPost = (state: RootState) =>
  selectPostModuleState(state).post;

export const selectNewPost = (state: RootState) =>
  selectPostModuleState(state).newPost;

export const selectEditingPost = (state: RootState) =>
  selectPostModuleState(state).editingPost;

export const selectPostStatus = (state: RootState) =>
  selectPostModuleState(state).status;

export const selectIsPostLoading = (state: RootState) =>
  selectPostStatus(state) === LoadingStatuses.inProgress;
