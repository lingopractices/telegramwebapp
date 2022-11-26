import { createAction } from '@reduxjs/toolkit';
import { uniqWith } from 'lodash';

import { INotifications, NotifType } from '../types';

export class SetNotification {
  static get action() {
    return createAction<NotifType>('notifications/SET_NOTIFICATION');
  }

  static get reducer() {
    return (draft: INotifications, { payload }: ReturnType<typeof SetNotification.action>) => {
      const updatedNotifications = uniqWith(
        [...draft.allNotifications, payload],
        (notificationA, notificationB) =>
          notificationA.text === notificationB.text && notificationA.type === notificationB.type,
      );
      draft.allNotifications = updatedNotifications;
      const [first] = draft.allNotifications;
      draft.curentNotification = first;

      return draft;
    };
  }
}
