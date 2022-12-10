import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { INotificationPreferenceDto } from 'lingopractices-models';

export class CreateAlertSuccess {
  static get action() {
    return createAction<INotificationPreferenceDto>('notifications/CREATE_ALERT_SUCCESS');
  }

  static get reducer() {
    return (draft: IAlertState, { payload }: ReturnType<typeof CreateAlertSuccess.action>) => {
      draft.requests.createNotificationsPending = false;
      draft.notificationsPreferecnces = [...draft.notificationsPreferecnces, payload];
    };
  }
}
