import { RootState } from '@store/store';

export const getMeetingsDaysSelector = (state: RootState) => state.meetings.meetingDays;

export const getMyMeetingsSelector = (state: RootState) => state.meetings.myMeetings.meetingList;

export const getMyMeetingHasMoreSelector = (state: RootState) => state.meetings.myMeetings.hasMore;

export const getMyMeetingByIdSelector = (id: number) => (state: RootState) =>
  state.meetings.myMeetings.meetingList.find((meeting) => meeting.id === id);

export const getMeetingsSelector = (state: RootState) => state.meetings.meetings.meetingList;

export const getMeetingHasMoreSelector = (state: RootState) => state.meetings.meetings.hasMore;

export const getMeetingByIdSelector = (id: number) => (state: RootState) =>
  state.meetings.meetings.meetingList.find((meeting) => meeting.id === id);

export const getLeaveMeetingPendingSelector = (state: RootState) =>
  state.meetings.requests.leaveMeetingPending;

export const getMeetingDaysPendingSelector = (state: RootState) =>
  state.meetings.requests.getMeetingDaysPending;

export const getMeetingsPendingSelector = (state: RootState) =>
  state.meetings.requests.getMeetingsPending;

export const getMeetingJoinPendingSelector = (state: RootState) =>
  state.meetings.requests.joinMeetingPending;

export const getCreateMeetingPendingSelector = (state: RootState) =>
  state.meetings.requests.createMeetingPending;

export const myMeetingsPendingSelector = (state: RootState) =>
  state.meetings.requests.getMyMeetingsPending;
