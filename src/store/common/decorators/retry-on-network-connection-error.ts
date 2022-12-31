import { InternetConnected } from '@store/internet/internet-connection-check/internet-connected';
import { InternetDisconnected } from '@store/internet/internet-connection-check/internet-disconnected';
import { AxiosError } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';

import { isNetworkError } from '../axios-errors';

export function* retryOnNetworkConnectionError(handler: () => SagaIterator): SagaIterator {
  while (true) {
    try {
      return yield call(handler);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (isNetworkError(e)) {
          yield put(InternetDisconnected.action());
          yield take(InternetConnected.action);
        } else {
          throw e;
        }
      }
    }
  }
}
