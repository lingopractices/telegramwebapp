import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import dayjs from 'dayjs';

export class JoinMeetingSuccess {
  static get action() {
    return createAction<number>('meetings/JOIN_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof JoinMeetingSuccess.action>) => {
      draft.requests.joinMeetingPending = false;
      draft.myMeetings.meetingList = [
        ...draft.myMeetings.meetingList,
        draft.meetings.meetingList.filter((meeting) => meeting.id === payload)[0],
      ].sort((a, b) => dayjs(a.meetingDate).unix() - dayjs(b.meetingDate).unix());
      return draft;
    };
  }
}
