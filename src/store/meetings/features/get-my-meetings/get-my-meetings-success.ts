import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

interface IGetMyMeetingsPayload {
  data: IMeeting[];
  hasMore: boolean;
}

export class GetMyMeetingsSuccess {
  static get action() {
    return createAction<IGetMyMeetingsPayload>('meetings/GET_MY_MEETINGS_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof GetMyMeetingsSuccess.action>) => {
      const { data, hasMore } = payload;

      draft.requests.getMyMeetingsPending = false;
      draft.myMeetings.hasMore = hasMore;
      draft.myMeetings.meetingList = [...draft.myMeetings.meetingList, ...data];
      return draft;
    };
  }
}
