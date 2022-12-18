import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { removeRequest } from '@utils/cancel-request';
import { sortGrowingDates } from '@utils/date-utils';
import { IMeeting } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

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

  static get saga() {
    return function* (action: ReturnType<typeof CreateMeetingSuccess.action>): SagaIterator {
      const { id } = yield select(getProfileDataSelector);

      removeRequest(id);
    };
  }
}
