import { TooltipType } from '@components/Tooltip/Tooltip';

export type NotifType = {
  id: number;
  type: TooltipType | undefined;
  text: string;
};

export interface INotifications {
  curentNotification: NotifType | undefined;
  allNotifications: NotifType[];
}
