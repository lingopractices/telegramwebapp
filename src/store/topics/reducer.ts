import { createReducer } from '@reduxjs/toolkit';

import { GetTopicsRequest } from './features/get-topics/get-topics';
import { GetTopicsSuccess } from './features/get-topics/get-topics-success';
import { ITopicsState } from './types';

const initialState: ITopicsState = {
  topics: [],
  selectedTopic: undefined,
  questions: [],
  requests: {
    getTopicsPending: false,
    getQuestionsByTopicIdPending: false,
    getTopicByIdPending: false,
  },
};

const reducer = createReducer<ITopicsState>(initialState, (builder) =>
  builder
    .addCase(GetTopicsRequest.action, GetTopicsRequest.reducer)
    .addCase(GetTopicsSuccess.action, GetTopicsSuccess.reducer),
);

export default reducer;
