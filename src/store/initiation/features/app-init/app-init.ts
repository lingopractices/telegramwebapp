import { createAction } from '@reduxjs/toolkit';
import { StartInternetConnectionStateChangeWatcher } from '@store/internet/internet-connection-check/start-internet-connection-state-change-watcher';
import { GetProfile } from '@store/profile/features/get-profile/get-profile';
import { GetUserTheme } from '@store/profile/features/get-user-theme/get-user-theme';
import { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export class AppInit {
  static get action() {
    return createAction('INIT');
  }

  static get saga() {
    return function* (): SagaIterator {
      yield put(GetUserTheme.action());
      yield put(GetProfile.action());
      yield call(StartInternetConnectionStateChangeWatcher.saga);
    };
  }
}
