import { createReducer } from '@reduxjs/toolkit';

import { ClearMeetings } from './features/clear-meetings/clear-meetings';
import { CreateMeeting } from './features/create-meeting/create-meeting';
import { CreateMeetingSuccess } from './features/create-meeting/create-meeting-success';
import { GetMeetingDays } from './features/get-meeting-days/get-meeting-days';
import { GetMeetingDaysSuccess } from './features/get-meeting-days/get-meeting-days-success';
import { GetMeetings } from './features/get-meetings/get-meetings';
import { GetMeetingsSuccess } from './features/get-meetings/get-meetings-success';
import { GetMyMeetings } from './features/get-my-meetings/get-my-meetings';
import { GetMyMeetingsSuccess } from './features/get-my-meetings/get-my-meetings-success';
import { JoinMeeting } from './features/join-meeting/join-meeting';
import { JoinMeetingSuccess } from './features/join-meeting/join-meeting-success';
import { LeaveMeeting } from './features/leave-meeting/leave-meeting';
import { LeaveMeetingSuccess } from './features/leave-meeting/leave-meeting-success';
import { IMeetingsState } from './types';

const initialState: IMeetingsState = {
  meetings: {
    meetingList: [],
    hasMore: true,
  },
  myMeetings: {
    meetingList: [],
    hasMore: true,
  },
  meetingDays: [],
  selectedMeeting: undefined,
  requests: {
    getMeetingsPending: false,
    getMeetingDaysPending: false,
    getMyMeetingsPending: false,
    createMeetingPending: false,
    joinMeetingPending: false,
    leaveMeetingPending: false,
  },
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(GetMeetings.action, GetMeetings.reducer)
    .addCase(GetMeetingsSuccess.action, GetMeetingsSuccess.reducer)
    .addCase(GetMyMeetings.action, GetMyMeetings.reducer)
    .addCase(GetMyMeetingsSuccess.action, GetMyMeetingsSuccess.reducer)
    .addCase(GetMeetingDays.action, GetMeetingDays.reducer)
    .addCase(GetMeetingDaysSuccess.action, GetMeetingDaysSuccess.reducer)
    .addCase(JoinMeeting.action, JoinMeeting.reducer)
    .addCase(JoinMeetingSuccess.action, JoinMeetingSuccess.reducer)
    .addCase(LeaveMeeting.action, LeaveMeeting.reducer)
    .addCase(LeaveMeetingSuccess.action, LeaveMeetingSuccess.reducer)
    .addCase(CreateMeeting.action, CreateMeeting.reducer)
    .addCase(CreateMeetingSuccess.action, CreateMeetingSuccess.reducer)
    .addCase(ClearMeetings.action, ClearMeetings.reducer),
);

export default reducer;
