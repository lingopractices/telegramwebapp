import { securityTokenSelector } from '@store/auth/selectors';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

export function* getAuthHeader(): SagaIterator {
  const securityToken = yield select(securityTokenSelector);

  return {
    Authorization: `${securityToken}`,
  };
}
