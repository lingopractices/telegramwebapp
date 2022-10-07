import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

export class JoinMeetingSuccess {
  static get action() {
    return createAction<IMeeting>('meeting/JOIN_MEETING_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof JoinMeetingSuccess.action>) => {
      draft.requests.joinMeetingPending = false;
      draft.meetings = [...draft.meetings, payload];
      return draft;
    };
  }
}
