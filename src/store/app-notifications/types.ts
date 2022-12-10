import { TooltipType } from '@components/Tooltip/Tooltip';

export type NotifType = {
  id: number;
  type: TooltipType | undefined;
  text: string;
};

export interface IAppNotifications {
  curentNotification: NotifType | undefined;
  allNotifications: NotifType[];
}
