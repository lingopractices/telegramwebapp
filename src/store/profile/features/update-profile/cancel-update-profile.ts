import { createAction } from '@reduxjs/toolkit';
import { getProfileDataSelector } from '@store/profile/selectors';
import { cancelRequest } from '@utils/cancel-request';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

export class CancelUpdateProfile {
  static get action() {
    return createAction('profile/CANCEL_UPDATE_PROFILE');
  }

  static get saga() {
    return function* (action: ReturnType<typeof CancelUpdateProfile.action>): SagaIterator {
      const { id } = yield select(getProfileDataSelector);
      cancelRequest(id);
    };
  }
}
