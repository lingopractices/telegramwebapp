import { createAction } from '@reduxjs/toolkit';

import { INotifications } from '../types';

export class RemoveNotification {
  static get action() {
    return createAction<number>('notifications/REMOVE_NOTIFICATION');
  }

  static get reducer() {
    return (draft: INotifications, { payload }: ReturnType<typeof RemoveNotification.action>) => {
      draft.allNotifications = draft.allNotifications.filter(
        (notification) => notification.id !== payload,
      );
      const [firstNotification] = draft.allNotifications;
      draft.curentNotification = firstNotification;

      return draft;
    };
  }
}
