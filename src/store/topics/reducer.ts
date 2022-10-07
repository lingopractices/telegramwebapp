import { createReducer } from '@reduxjs/toolkit';

import { GetQuestionsByTopicIdRequest } from './features/get-questions/get-questions-by-topic-id-request';
import { GetQuestionsByTopicIdSuccess } from './features/get-questions/get-questions-by-topic-id-success';
import { GetTopicByIdRequest } from './features/get-topic-by-id/get-topic-by-id-request';
import { GetTopicByIdSuccess } from './features/get-topic-by-id/get-topic-by-id-success';
import { GetTopicsRequest } from './features/get-topics/get-topics-request';
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
    .addCase(GetTopicByIdRequest.action, GetTopicByIdRequest.reducer)
    .addCase(GetTopicByIdSuccess.action, GetTopicByIdSuccess.reducer)
    .addCase(GetTopicsRequest.action, GetTopicsRequest.reducer)
    .addCase(GetTopicsSuccess.action, GetTopicsSuccess.reducer)
    .addCase(GetQuestionsByTopicIdRequest.action, GetQuestionsByTopicIdRequest.reducer)
    .addCase(GetQuestionsByTopicIdSuccess.action, GetQuestionsByTopicIdSuccess.reducer),
);

export default reducer;
