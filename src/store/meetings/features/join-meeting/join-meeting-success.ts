import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class JoinMeetingSuccess {
  static get action() {
    return createAction<number>('meetings/JOIN_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof JoinMeetingSuccess.action>) => {
      draft.requests.joinMeetingPending = false;
      draft.myMeetings = [
        ...draft.myMeetings,
        draft.meetings.filter((meeting) => meeting.id === payload)[0],
      ];
      return draft;
    };
  }
}
