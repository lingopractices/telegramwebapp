import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class LeaveMeetingFailure {
  static get action() {
    return createAction('meetings/LEAVE_MEETING_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.leaveMeetingPending = false;
      return draft;
    };
  }
}
