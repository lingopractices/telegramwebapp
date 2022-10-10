import { createReducer } from '@reduxjs/toolkit';

import { GetMeetingDaysRequest } from './features/get-meeting-days/get-meeting-days';
import { GetMeetingDaysSuccess } from './features/get-meeting-days/get-meeting-days-success';
import { GetMeetingsRequest } from './features/get-meetings/get-meetings';
import { GetMeetingsSuccess } from './features/get-meetings/get-meetings-success';
import { JoinMeetingRequest } from './features/join-meeting/join-meeting';
import { JoinMeetingSuccess } from './features/join-meeting/join-meeting-success';
import { IMeetingsState } from './types';

const initialState: IMeetingsState = {
  meetings: [],
  meetingDays: [],
  selectedMeeting: undefined,
  requests: {
    getMeetingsPending: false,
    getMeetingDaysPending: false,
    getSelectedMeetingPending: false,
    createMeetingPending: false,
    joinMeetingPending: false,
  },
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(GetMeetingsRequest.action, GetMeetingsRequest.reducer)
    .addCase(GetMeetingsSuccess.action, GetMeetingsSuccess.reducer)
    .addCase(GetMeetingDaysRequest.action, GetMeetingDaysRequest.reducer)
    .addCase(GetMeetingDaysSuccess.action, GetMeetingDaysSuccess.reducer)
    .addCase(JoinMeetingRequest.action, JoinMeetingRequest.reducer)
    .addCase(JoinMeetingSuccess.action, JoinMeetingSuccess.reducer),
);

export default reducer;
