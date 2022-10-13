import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

export class GetMeetingsSuccess {
  static get action() {
    return createAction<IMeeting[]>('meetings/GET_MEETINGS_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof GetMeetingsSuccess.action>) => {
      draft.requests.getMeetingsPending = false;
      draft.meetings = payload;
      return draft;
    };
  }
}
