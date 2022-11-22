import { securityTokenSelector } from '@store/auth/selectors';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

export function* getAuthHeader(): SagaIterator {
  let securityToken: string;

  if (import.meta.env.DEV) {
    securityToken = import.meta.env.VITE_TG_TOKEN;
  } else {
    securityToken = yield select(securityTokenSelector);
  }

  return {
    Authorization: `${securityToken}`,
  };
}
