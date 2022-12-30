import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class GetMyMeetingsFailure {
  static get action() {
    return createAction('meetings/GET_MY_MEETINGS_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMyMeetingsPending = false;
      return draft;
    };
  }
}
