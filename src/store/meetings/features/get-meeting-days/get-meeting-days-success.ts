import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class GetMeetingDaysSuccess {
  static get action() {
    return createAction<string[]>('meetings/GET_MEETING_DAYS_SUCCESS');
  }

  static get reducer() {
    return (
      draft: IMeetingsState,
      { payload }: ReturnType<typeof GetMeetingDaysSuccess.action>,
    ) => {
      draft.meetingDays = [...payload];
      draft.requests.getMeetingDaysPending = false;
      return draft;
    };
  }
}
