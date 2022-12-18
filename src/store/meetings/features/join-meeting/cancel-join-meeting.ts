import { createAction } from '@reduxjs/toolkit';
import { cancelRequest } from '@utils/cancel-request';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

export class CancelJoinMeeting {
  static get action() {
    return createAction<number>('profile/CANCEL_JOIN_PROFILE');
  }

  static get saga() {
    return function* (action: ReturnType<typeof CancelJoinMeeting.action>): SagaIterator {
      yield call(cancelRequest, action.payload);
    };
  }
}
