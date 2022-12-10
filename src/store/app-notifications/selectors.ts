import { RootState } from '@store/store';

export const currentNotificationSelector = (state: RootState) =>
  state.notifications.curentNotification;
