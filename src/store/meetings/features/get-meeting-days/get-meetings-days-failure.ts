import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class GetMeetingDaysFailure {
  static get action() {
    return createAction('meetings/GET_MEETING_DAYS_FAILURE');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.getMeetingDaysPending = false;
      return draft;
    };
  }
}
