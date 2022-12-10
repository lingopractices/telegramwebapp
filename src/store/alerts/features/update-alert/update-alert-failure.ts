import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';

export class UpdateAlertFailure {
  static get action() {
    return createAction('notifications/Update_ALERT_FAILURE');
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.updateNotificationsPending = false;
      return draft;
    };
  }
}
