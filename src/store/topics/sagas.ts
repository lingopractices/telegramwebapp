import { all, takeLatest } from 'redux-saga/effects';

import { GetTopics } from './features/get-topics/get-topics';

export function* topicSagas() {
  yield all([takeLatest(GetTopics.action, GetTopics.saga)]);
}
