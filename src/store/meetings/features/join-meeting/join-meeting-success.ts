import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { sortGrowingDates } from '@utils/dateUtils';

export class JoinMeetingSuccess {
  static get action() {
    return createAction<number>('meetings/JOIN_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof JoinMeetingSuccess.action>) => {
      draft.requests.joinMeetingPending = false;
      draft.myMeetings.meetingList = sortGrowingDates([
        ...draft.myMeetings.meetingList,
        ...draft.meetings.meetingList.filter((meeting) => meeting.id === payload),
      ]);
      return draft;
    };
  }
}
