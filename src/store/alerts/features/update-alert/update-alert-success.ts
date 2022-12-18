import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { removeRequest } from '@utils/cancel-request';
import { IUpdateNotificationPreference } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

export class UpdateAlertSuccess {
  static get action() {
    return createAction<IUpdateNotificationPreference>('notifications/UPDATE_ALERT_SUCCESS');
  }

  static get reducer() {
    return (draft: IAlertState, { payload }: ReturnType<typeof UpdateAlertSuccess.action>) => {
      draft.requests.updateNotificationsPending = false;
      if (payload.languageLevel) {
        const alertIndex = draft.notificationsPreferecnces.findIndex(
          (item) => item.id === payload.id,
        );

        draft.notificationsPreferecnces[alertIndex] = payload;
      } else {
        draft.notificationsPreferecnces = draft.notificationsPreferecnces.filter(
          (alert) => alert.id !== payload.id,
        );
      }

      return draft;
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof UpdateAlertSuccess.action>): SagaIterator {
      yield call(removeRequest, action.payload.id);
    };
  }
}
