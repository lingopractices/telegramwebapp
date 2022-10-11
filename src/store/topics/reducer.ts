import { createReducer } from '@reduxjs/toolkit';

import { GetTopics } from './features/get-topics/get-topics';
import { GetTopicsSuccess } from './features/get-topics/get-topics-success';
import { ITopicsState } from './types';

const initialState: ITopicsState = {
  topics: [],
  questions: [],
  requests: {
    getTopicsPending: false,
  },
};

const reducer = createReducer<ITopicsState>(initialState, (builder) =>
  builder
    .addCase(GetTopics.action, GetTopics.reducer)
    .addCase(GetTopicsSuccess.action, GetTopicsSuccess.reducer),
);

export default reducer;
