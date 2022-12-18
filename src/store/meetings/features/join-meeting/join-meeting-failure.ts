import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class JoinMeetingFailure {
  static get action() {
    return createAction('meetings/JOIN_MEETING_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.joinMeetingPending = false;
      return draft;
    };
  }
}
