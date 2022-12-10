import { INotificationPreferenceDto } from 'lingopractices-models';

export interface IAlertState {
  notificationsPreferecnces: INotificationPreferenceDto[];
  requests: {
    getNotificationsPending: boolean;
    createNotificationsPending: boolean;
    updateNotificationsPending: boolean;
  };
}
