import { INotificationPreferenceDto } from 'lingopractices-models';

export interface IAlertState {
  notificationsPreferecnces: INotificationPreferenceDto[] | undefined;
  requests: {
    getNotificationsPending: boolean;
    createNotificationsPending: boolean;
    updateNotificationsPending: boolean;
  };
}
