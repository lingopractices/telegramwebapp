import { all, takeLatest } from 'redux-saga/effects';

import { CreateMeeting } from './features/create-meeting/create-meeting';
import { GetMeetingDays } from './features/get-meeting-days/get-meeting-days';
import { GetMeetings } from './features/get-meetings/get-meetings';
import { JoinMeeting } from './features/join-meeting/join-meeting';

export function* meetingSagas() {
  yield all([
    takeLatest(GetMeetings.action, GetMeetings.saga),
    takeLatest(GetMeetingDays.action, GetMeetingDays.saga),
    takeLatest(CreateMeeting.action, CreateMeeting.saga),
    takeLatest(JoinMeeting.action, JoinMeeting.saga),
  ]);
}
