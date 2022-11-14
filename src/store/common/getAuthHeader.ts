import { securityTokenSelector } from '@store/auth/selectors';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';

export function* getAuthHeader(): SagaIterator {
  let securityToken: string;

  const devToken =
    'query_id=AAGBC9lIAAAAAIEL2UhcT50X&user=%7B%22id%22%3A1222183809%2C%22first_name%22%3A%22%D0%AF%D0%BD%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difFlow%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1668441062&hash=cf89fefc140295ba57d938f3c4f117abfc972a521fd507dc69d5fce2294dbb5c';

  if (import.meta.env.DEV) {
    securityToken = devToken;
  } else {
    securityToken = yield select(securityTokenSelector);
  }

  return {
    Authorization: `${securityToken}`,
  };
}
