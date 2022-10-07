import { createReducer } from '@reduxjs/toolkit';

import { GetTopicRequest } from './features/get-topic/get-topic-request';
import { GetTopicSuccess } from './features/get-topic/get-topic-success';
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
    .addCase(GetTopicRequest.action, GetTopicRequest.reducer)
    .addCase(GetTopicSuccess.action, GetTopicSuccess.reducer),
);

export default reducer;
