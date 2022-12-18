import { CancelCreateAlert } from './features/create-alert/cancel-create-alert';
import { CreateAlert } from './features/create-alert/create-alert';
import { GetAlerts } from './features/get-alerts/get-alerts';
import { CancelUpdateAlert } from './features/update-alert/cancel-update-alert';
import { UpdateAlert } from './features/update-alert/update-alert';

export const getAlertsAction = GetAlerts.action;
export const createAlertAction = CreateAlert.action;
export const updateAlertAction = UpdateAlert.action;
export const cancelCreateAlertAcion = CancelCreateAlert.action;
export const cancelUpdateAlertAcion = CancelUpdateAlert.action;
