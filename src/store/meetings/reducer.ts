import { createReducer } from '@reduxjs/toolkit';

import { GetMeetingDaysRequest } from './features/get-meeting-days/get-meeting-days-request';
import { GetMeetingDaysSuccess } from './features/get-meeting-days/get-meeting-days-success';
import { GetMeetingsRequest } from './features/get-meetings/get-meetings-request';
import { GetMeetingsSuccess } from './features/get-meetings/get-meetings-success';
import { GetSelectedMeetingRequest } from './features/get-selected-meeting/get-selected-meeting-request';
import { GetSelectedMeetingSuccess } from './features/get-selected-meeting/get-selected-meeting-success';
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
  },
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(GetMeetingsRequest.action, GetMeetingsRequest.reducer)
    .addCase(GetMeetingsSuccess.action, GetMeetingsSuccess.reducer)
    .addCase(GetMeetingDaysRequest.action, GetMeetingDaysRequest.reducer)
    .addCase(GetMeetingDaysSuccess.action, GetMeetingDaysSuccess.reducer)
    .addCase(GetSelectedMeetingRequest.action, GetSelectedMeetingRequest.reducer)
    .addCase(GetSelectedMeetingSuccess.action, GetSelectedMeetingSuccess.reducer),
);

export default reducer;
