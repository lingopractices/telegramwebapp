import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';

export class ClearMeetings {
  static get action() {
    return createAction('meetings/CLEAR_MEETINGS');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.meetings.meetingList = [];
      draft.meetings.hasMore = true;

      return draft;
    };
  }
}
