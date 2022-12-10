import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';
import { IUpdateNotificationPreference } from 'lingopractices-models';

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
}
