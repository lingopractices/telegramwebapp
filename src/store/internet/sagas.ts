import { spawn, all } from 'redux-saga/effects';

import { StartInternetConnectionStateChangeWatcher } from './internet-connection-check/start-internet-connection-state-change-watcher';

export function* internetSagas() {
  yield all([spawn(StartInternetConnectionStateChangeWatcher.saga)]);
}
