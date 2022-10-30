import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class LeaveMeetingSuccess {
  static get action() {
    return createAction<number>('meetings/LEAVE_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof LeaveMeetingSuccess.action>) => {
      draft.requests.leaveMeetingPending = false;
      draft.myMeetings.meetingList = draft.myMeetings.meetingList.filter(
        (meeting) => meeting.id !== payload,
      );

      return draft;
    };
  }
}
