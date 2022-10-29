import { RootState } from '@store/store';

export const getTopicsSelector = (state: RootState) => state.topics.topics;
export const getTopicsPendingSelector = (state: RootState) =>
  state.topics.requests.getTopicsPending;
export const getTopicsHasMoreSelector = (state: RootState) => state.topics.hasMore;
