import { RootState } from '@store/store';

export const alertsSelector = (state: RootState) => state.alerts.notificationsPreferecnces;

export const alertsPendingSelector = (state: RootState) =>
  state.alerts.requests.getNotificationsPending;

export const alertsExistSelector = (state: RootState) =>
  state.alerts.notificationsPreferecnces.some((alert) => alert.languageLevel);

export const alertByLanguageIdSelector = (languageId?: string) => (state: RootState) =>
  state.alerts.notificationsPreferecnces.find((alertItem) => alertItem.languageId === languageId);

export const createAlertPendingSelector = (state: RootState) =>
  state.alerts.requests.createNotificationsPending;
export const updateAlertPendingSelector = (state: RootState) =>
  state.alerts.requests.updateNotificationsPending;
