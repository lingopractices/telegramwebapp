import { createAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, take, select, delay, spawn, call } from 'redux-saga/effects';

import { getInternetStateSelector } from '../selectors';

import { InternetConnected } from './internet-connected';
import { InternetDisconnected } from './internet-disconnected';

function* watchInternetConnectionChange(): SagaIterator {
  const ping = (): Promise<boolean> =>
    new Promise((resolve) => {
      const isOnline = () => resolve(true);
      const isOffline = () => resolve(false);

      fetch(`/file-for-ping.txt?d=${Date.now()}`)
        .then((response) => {
          if (response.ok) {
            isOnline();
          } else {
            isOffline();
          }
        })
        .catch(isOffline);
    });

  while (true) {
    yield delay(3000);

    const isOnline = yield select(getInternetStateSelector);

    if (isOnline) {
      yield take(InternetDisconnected.action);
    }

    const internetState = yield call(ping);

    if (isOnline !== internetState) {
      if (internetState) {
        yield put(InternetConnected.action());
      } else {
        yield put(InternetDisconnected.action());
      }
    }
  }
}

export class StartInternetConnectionStateChangeWatcher {
  static get action() {
    return createAction('START_INTERNET_CONNECTION_WATCHER');
  }

  static get saga() {
    return function* (): SagaIterator {
      yield spawn(watchInternetConnectionChange);
    };
  }
}
