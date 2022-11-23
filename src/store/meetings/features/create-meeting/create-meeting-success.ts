import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { sortGrowingDates } from '@utils/date-utils';
import { IMeeting } from 'lingopractices-models';

export class CreateMeetingSuccess {
  static get action() {
    return createAction<IMeeting>('meetings/CREATE_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof CreateMeetingSuccess.action>) => {
      draft.myMeetings.meetingList = sortGrowingDates([...draft.myMeetings.meetingList, payload]);
      draft.requests.createMeetingPending = false;
      return draft;
    };
  }
}
