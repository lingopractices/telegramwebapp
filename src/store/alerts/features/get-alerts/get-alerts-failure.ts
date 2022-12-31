import { createAction } from '@reduxjs/toolkit';
import { IAlertState } from '@store/alerts/types';

export class GetAlertFailure {
  static get action() {
    return createAction('notifications/GET_ALERT_FAILURE');
  }

  static get reducer() {
    return (draft: IAlertState) => {
      draft.requests.getNotificationsPending = false;
      return draft;
    };
  }
}
