import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

export class GetMyMeetingsSuccess {
  static get action() {
    return createAction<IMeeting[]>('meetings/GET_MY_MEETINGS_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof GetMyMeetingsSuccess.action>) => {
      draft.requests.getMyMeetingsPending = false;
      draft.myMeetings = payload;
      return draft;
    };
  }
}
