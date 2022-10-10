import { all, takeLatest } from 'redux-saga/effects';

import { CreateMeetingRequest } from './features/create-meeting/create-meeting';
import { GetMeetingDaysRequest } from './features/get-meeting-days/get-meeting-days';
import { GetMeetingsRequest } from './features/get-meetings/get-meetings';
import { JoinMeetingRequest } from './features/join-meeting/join-meeting';

export function* meetingsSaga() {
  yield all([
    takeLatest(GetMeetingsRequest.action, GetMeetingsRequest.saga),
    takeLatest(GetMeetingDaysRequest.action, GetMeetingDaysRequest.saga),
    takeLatest(CreateMeetingRequest.action, CreateMeetingRequest.saga),
    takeLatest(JoinMeetingRequest.action, JoinMeetingRequest.saga),
  ]);
}
