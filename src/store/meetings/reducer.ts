import { createReducer } from '@reduxjs/toolkit';

import { GetMeetingsRequest } from './features/get-meetings/get-meetings-request';
import { GetMeetingsSuccess } from './features/get-meetings/get-meetings-success';
import { IMeetingsState } from './types';

const initialState: IMeetingsState = {
  meetings: [],
  meetingDays: [],
  requests: {
    getMeetingsPending: false,
    getMeetingDaysPending: false,
  },
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(GetMeetingsRequest.action, GetMeetingsRequest.reducer)
    .addCase(GetMeetingsSuccess.action, GetMeetingsSuccess.reducer),
);

export default reducer;
