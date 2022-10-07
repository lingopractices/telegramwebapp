import { all, takeLatest } from 'redux-saga/effects';

import { CreateMeetingRequest } from './features/create-meeting/create-meeting-request';
import { GetMeetingDaysRequest } from './features/get-meeting-days/get-meeting-days-request';
import { GetMeetingsRequest } from './features/get-meetings/get-meetings-request';
import { GetSelectedMeetingRequest } from './features/get-selected-meeting/get-selected-meeting-request';
import { JoinMeetingRequest } from './features/join-meeting/join-meeting-request';

export function* meetingsSaga() {
  yield all([
    takeLatest(GetMeetingsRequest.action, GetMeetingsRequest.saga),
    takeLatest(GetMeetingDaysRequest.action, GetMeetingDaysRequest.saga),
    takeLatest(GetSelectedMeetingRequest.action, GetSelectedMeetingRequest.saga),
    takeLatest(CreateMeetingRequest.action, CreateMeetingRequest.saga),
    takeLatest(JoinMeetingRequest.action, JoinMeetingRequest.saga),
  ]);
}
