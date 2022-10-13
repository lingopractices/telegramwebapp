import { createReducer } from '@reduxjs/toolkit';

import { GetQuestionsByTopicId } from './features/get-questions/get-questions';
import { GetQuestionsByTopicIdSuccess } from './features/get-questions/get-questions-success';
import { GetTopics } from './features/get-topics/get-topics';
import { GetTopicsSuccess } from './features/get-topics/get-topics-success';
import { ITopicsState } from './types';

const initialState: ITopicsState = {
  topics: [],
  questions: {},
  requests: {
    getTopicsPending: false,
    getQuestionsPending: false,
  },
};

const reducer = createReducer<ITopicsState>(initialState, (builder) =>
  builder
    .addCase(GetTopics.action, GetTopics.reducer)
    .addCase(GetTopicsSuccess.action, GetTopicsSuccess.reducer)
    .addCase(GetQuestionsByTopicId.action, GetQuestionsByTopicId.reducer)
    .addCase(GetQuestionsByTopicIdSuccess.action, GetQuestionsByTopicIdSuccess.reducer),
);

export default reducer;
