import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

export class CreateMeetingSuccess {
  static get action() {
    return createAction<IMeeting>('meetings/CREATE_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof CreateMeetingSuccess.action>) => {
      draft.myMeetings = [...draft.myMeetings, payload];

      return draft;
    };
  }
}
