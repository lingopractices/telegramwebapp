import { RootState } from '@store/store';
import { isEmpty } from 'lodash';

export const alertsSelector = (state: RootState) => state.alerts.notificationsPreferecnces;

export const alertsExistSelector = (state: RootState) =>
  !isEmpty(state.alerts.notificationsPreferecnces);

export const alertByLanguageIdSelector = (languageId?: string) => (state: RootState) =>
  state.alerts.notificationsPreferecnces.find((alertItem) => alertItem.languageId === languageId);

export const createAlertPendingSelector = (state: RootState) =>
  state.alerts.requests.createNotificationsPending;
export const updateAlertPendingSelector = (state: RootState) =>
  state.alerts.requests.updateNotificationsPending;
