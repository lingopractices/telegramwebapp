import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';

export class CreateAlertFailure {
  static get action() {
    return createAction('notifications/CREATE_ALERT_FAILURE');
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.createNotificationsPending = false;
      return draft;
    };
  }
}
