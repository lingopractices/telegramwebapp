import { all, takeLatest } from 'redux-saga/effects';

import { GetQuestionsByTopicIdRequest } from './features/get-questions/get-questions-by-topic-id-request';
import { GetTopicByIdRequest } from './features/get-topic-by-id/get-topic-by-id-request';
import { GetTopicsRequest } from './features/get-topics/get-topics-request';

export function* topicsSaga() {
  yield all([
    takeLatest(GetTopicByIdRequest.action, GetTopicByIdRequest.saga),
    takeLatest(GetTopicsRequest.action, GetTopicsRequest.saga),
    takeLatest(GetQuestionsByTopicIdRequest.action, GetQuestionsByTopicIdRequest.saga),
  ]);
}
