import { CreateAlert } from './features/create-alert/create-alert';
import { GetAlerts } from './features/get-alerts/get-alerts';
import { UpdateAlert } from './features/update-alert/update-alert';

export const getAlertsAction = GetAlerts.action;
export const createAlertAction = CreateAlert.action;
export const updateAlertAction = UpdateAlert.action;
