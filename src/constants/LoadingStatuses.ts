interface ILoadingStatuses {
  [key: string]: string;
}

export const LoadingStatuses: ILoadingStatuses = {
  idle: "idle",
  inProgress: "inProgress",
  success: "success",
  failed: "failed",
};
