import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { CancelCreateMeeting } from './features/create-meeting/cancel-create-meeting';
import { CreateMeeting } from './features/create-meeting/create-meeting';
import { CreateMeetingSuccess } from './features/create-meeting/create-meeting-success';
import { GetMeetingDays } from './features/get-meeting-days/get-meeting-days';
import { GetMeetings } from './features/get-meetings/get-meetings';
import { GetMyMeetings } from './features/get-my-meetings/get-my-meetings';
import { CancelJoinMeeting } from './features/join-meeting/cancel-join-meeting';
import { JoinMeeting } from './features/join-meeting/join-meeting';
import { LeaveMeeting } from './features/leave-meeting/leave-meeting';

export function* meetingSagas() {
  yield all([
    takeLatest(GetMeetings.action, GetMeetings.saga),
    takeLatest(GetMeetingDays.action, GetMeetingDays.saga),
    takeLatest(GetMyMeetings.action, GetMyMeetings.saga),
    takeLatest(CreateMeeting.action, CreateMeeting.saga),
    takeLatest(CreateMeetingSuccess.action, CreateMeetingSuccess.saga),
    takeEvery(CancelCreateMeeting.action, CancelCreateMeeting.saga),
    takeLatest(JoinMeeting.action, JoinMeeting.saga),
    takeLatest(CancelJoinMeeting.action, CancelJoinMeeting.saga),
    takeLatest(LeaveMeeting.action, LeaveMeeting.saga),
  ]);
}
