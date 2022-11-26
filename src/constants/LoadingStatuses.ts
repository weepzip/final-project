interface ILoadingStatuses {
  idle: string;
  inProgress: string;
  success: string;
  failed: string;
  earlyAdded: string;
}

export const LoadingStatuses: ILoadingStatuses = {
  idle: "idle",
  inProgress: "inProgress",
  success: "success",
  failed: "failed",
  earlyAdded: "earlyAdded",
};
