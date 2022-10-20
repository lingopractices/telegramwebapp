import { RootState } from '@store/store';

export const getMyMeetingsSelector = (state: RootState) => state.meetings.myMeetings;

export const getMyMeetingByIdSelector = (id: number) => (state: RootState) =>
  state.meetings.myMeetings.find((meeting) => meeting.id === id);

export const leaveMeetingPendingSelector = (state: RootState) =>
  state.meetings.requests.leaveMeetingPending;
