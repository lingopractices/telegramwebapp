import { all, takeLeading } from 'redux-saga/effects';

import { AppInit } from './features/app-init/app-init';

export function* initSaga() {
  yield all([takeLeading(AppInit.action, AppInit.saga)]);
}
