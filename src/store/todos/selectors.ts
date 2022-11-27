import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { RootState } from "../index";

type ITodoId = {
  todoId: string | number;
};

export const selectTodosModuleState = (state: RootState) => state.todos;

export const selectTodosEntities = (state: RootState) =>
  selectTodosModuleState(state).entities;

export const selectCompletedTodosIds = (state: RootState) =>
  selectTodosModuleState(state).completedIds;

export const selectUncompletedTodosIds = (state: RootState) =>
  selectTodosModuleState(state).uncompletedIds;

export const selectTodosStatus = (state: RootState) =>
  selectTodosModuleState(state).status;

export const selectIsTodosLoading = (state: RootState) =>
  selectTodosStatus(state) === LoadingStatuses.inProgress;

export const selectTodoById = (state: RootState, { todoId }: ITodoId) =>
  selectTodosEntities(state)[todoId];
