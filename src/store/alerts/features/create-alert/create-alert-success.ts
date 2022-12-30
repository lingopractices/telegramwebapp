import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { removeRequest } from '@utils/cancel-request';
import { INotificationPreferenceDto } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

export class CreateAlertSuccess {
  static get action() {
    return createAction<INotificationPreferenceDto>('notifications/CREATE_ALERT_SUCCESS');
  }

  static get reducer() {
    return (draft: IAlertState, { payload }: ReturnType<typeof CreateAlertSuccess.action>) => {
      draft.requests.createNotificationsPending = false;

      if (!draft.notificationsPreferecnces) {
        draft.notificationsPreferecnces = [payload];
      } else {
        draft.notificationsPreferecnces = [...draft.notificationsPreferecnces, payload];
      }
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof CreateAlertSuccess.action>): SagaIterator {
      const { id } = yield select(getProfileDataSelector);
      removeRequest(id);
    };
  }
}
