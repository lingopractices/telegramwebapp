import { createReducer } from '@reduxjs/toolkit';

import { CreateAlert } from './features/create-alert/create-alert';
import { CreateAlertSuccess } from './features/create-alert/create-alert-success';
import { GetAlerts } from './features/get-alerts/get-alerts';
import { GetAlertsSuccess } from './features/get-alerts/get-alerts-success';
import { UpdateAlert } from './features/update-alert/update-alert';
import { UpdateAlertSuccess } from './features/update-alert/update-alert-success';
import { IAlertState } from './types';

const initialState: IAlertState = {
  notificationsPreferecnces: [],
  requests: {
    getNotificationsPending: false,
    createNotificationsPending: false,
    updateNotificationsPending: false,
  },
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(GetAlerts.action, GetAlerts.reducer)
    .addCase(GetAlertsSuccess.action, GetAlertsSuccess.reducer)
    .addCase(CreateAlert.action, CreateAlert.reducer)
    .addCase(CreateAlertSuccess.action, CreateAlertSuccess.reducer)
    .addCase(UpdateAlert.action, UpdateAlert.reducer)
    .addCase(UpdateAlertSuccess.action, UpdateAlertSuccess.reducer),
);

export default reducer;
