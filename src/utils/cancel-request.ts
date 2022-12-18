import { CancelTokenSource } from 'axios';

const pendingRequestMap = new Map<number, CancelTokenSource>();

export const cancelRequest = (id: number): boolean => {
  const cancelToken = pendingRequestMap.get(id);
  if (cancelToken) {
    cancelToken.cancel();

    pendingRequestMap.delete(id);
    return true;
  }
  return false;
};

export const addPendingRequest = (id: number, cancelToken: CancelTokenSource) => {
  pendingRequestMap.set(id, cancelToken);
};

export const removeRequest = (id: number) => {
  if (pendingRequestMap.get(id)) {
    pendingRequestMap.delete(id);
    return true;
  }
  return false;
};
