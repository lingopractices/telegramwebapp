import { all, takeLatest } from 'redux-saga/effects';

import { GetTopicRequest } from './features/get-topic/get-topic-request';

export function* topicsSaga() {
  yield all([takeLatest(GetTopicRequest.action, GetTopicRequest.saga)]);
}
