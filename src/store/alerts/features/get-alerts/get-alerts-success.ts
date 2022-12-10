import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { INotificationPreferenceDto } from 'lingopractices-models';

export class GetAlertsSuccess {
  static get action() {
    return createAction<INotificationPreferenceDto[]>(
      'notifications/GET_NOTIFICATIONS_PREFERENCES_SUCCESS',
    );
  }

  static get reducer() {
    return (draft: IAlertState, { payload }: ReturnType<typeof GetAlertsSuccess.action>) => {
      draft.notificationsPreferecnces = payload;
      draft.requests.getNotificationsPending = false;

      return draft;
    };
  }
}
