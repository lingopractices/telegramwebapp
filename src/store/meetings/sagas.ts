import { all, takeLatest } from 'redux-saga/effects';

import { GetMeetingDaysRequest } from './features/get-meeting-days/get-meeting-days-request';
import { GetMeetingsRequest } from './features/get-meetings/get-meetings-request';

export function* meetingsSaga() {
  yield all([
    takeLatest(GetMeetingsRequest.action, GetMeetingsRequest.saga),
    takeLatest(GetMeetingDaysRequest.action, GetMeetingDaysRequest.saga),
  ]);
}
