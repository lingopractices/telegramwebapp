import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class GetMeetingsFailure {
  static get action() {
    return createAction('meetings/GET_MEETINGS_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingsPending = false;
      return draft;
    };
  }
}
