import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { CancelCreateAlert } from './features/create-alert/cancel-create-alert';
import { CreateAlert } from './features/create-alert/create-alert';
import { GetAlerts } from './features/get-alerts/get-alerts';
import { CancelUpdateAlert } from './features/update-alert/cancel-update-alert';
import { UpdateAlert } from './features/update-alert/update-alert';

export function* alertsSagas() {
  yield all([takeEvery(GetAlerts.action, GetAlerts.saga)]);
  yield all([takeEvery(CancelCreateAlert.action, CancelCreateAlert.saga)]);
  yield all([takeLatest(CreateAlert.action, CreateAlert.saga)]);
  yield all([takeLatest(UpdateAlert.action, UpdateAlert.saga)]);
  yield all([takeEvery(CancelUpdateAlert.action, CancelUpdateAlert.saga)]);
}
