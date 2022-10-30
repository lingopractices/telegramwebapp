import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

interface IGetMeetingSuccessPyload {
  data: IMeeting[];
  hasMore: boolean;
}

export class GetMeetingsSuccess {
  static get action() {
    return createAction<IGetMeetingSuccessPyload>('meetings/GET_MEETINGS_SUCCESS');
  }

  static get reducer() {
    return (draft: IMeetingsState, { payload }: ReturnType<typeof GetMeetingsSuccess.action>) => {
      const { data, hasMore } = payload;

      draft.requests.getMeetingsPending = false;
      draft.meetings.hasMore = hasMore;
      draft.meetings.meetingList = [...draft.meetings.meetingList, ...data];
      return draft;
    };
  }
}
