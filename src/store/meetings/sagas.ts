import { all, takeLatest } from 'redux-saga/effects';

import { GetMeetingsRequest } from './features/get-meetings/get-meetings-request';

export function* meetingsSaga() {
  yield all([takeLatest(GetMeetingsRequest.action, GetMeetingsRequest.saga)]);
}
