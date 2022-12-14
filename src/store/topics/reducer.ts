import { createReducer } from '@reduxjs/toolkit';

import { GetTopics } from './features/get-topics/get-topics';
import { GetTopicsFailure } from './features/get-topics/get-topics-failure';
import { GetTopicsSuccess } from './features/get-topics/get-topics-success';
import { ITopicsState } from './types';

const initialState: ITopicsState = {
  topics: [],
  hasMore: true,
  requests: {
    getTopicsPending: false,
  },
};

const reducer = createReducer<ITopicsState>(initialState, (builder) =>
  builder
    .addCase(GetTopics.action, GetTopics.reducer)
    .addCase(GetTopicsSuccess.action, GetTopicsSuccess.reducer)
    .addCase(GetTopicsFailure.action, GetTopicsFailure.reducer),
);

export default reducer;
