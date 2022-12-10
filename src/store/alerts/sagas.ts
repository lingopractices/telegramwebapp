import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { CreateAlert } from './features/create-alert/create-alert';
import { GetAlerts } from './features/get-alerts/get-alerts';
import { UpdateAlert } from './features/update-alert/update-alert';

export function* alertsSagas() {
  yield all([takeEvery(GetAlerts.action, GetAlerts.saga)]);
  yield all([takeLatest(CreateAlert.action, CreateAlert.saga)]);
  yield all([takeLatest(UpdateAlert.action, UpdateAlert.saga)]);
}
