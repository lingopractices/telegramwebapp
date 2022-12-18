import { createAction } from '@reduxjs/toolkit';
import { cancelRequest } from '@utils/cancel-request';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

export class CancelUpdateAlert {
  static get action() {
    return createAction<number>('profile/CANCEL_UPDATE_ALERT');
  }

  static get saga() {
    return function* (action: ReturnType<typeof CancelUpdateAlert.action>): SagaIterator {
      yield call(cancelRequest, action.payload);
    };
  }
}
