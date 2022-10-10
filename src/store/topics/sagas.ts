import { all, takeLatest } from 'redux-saga/effects';

import { GetTopicsRequest } from './features/get-topics/get-topics';

export function* topicsSaga() {
  yield all([takeLatest(GetTopicsRequest.action, GetTopicsRequest.saga)]);
}
