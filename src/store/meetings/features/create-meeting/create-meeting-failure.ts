import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class CreateMeetingFailure {
  static get action() {
    return createAction('meetings/CREATE_MEETING_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.createMeetingPending = false;
      return draft;
    };
  }
}
