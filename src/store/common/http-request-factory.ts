import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { getAuthHeader } from './getAuthHeader';
import { httpRequest } from './http-request';
import { HttpRequestMethod } from './http-request-method';
import { HttpHeaders, UrlGenerator } from './types';

export const httpRequestFactory = <TResponse, TBody>(
  url: string | UrlGenerator<TBody>,
  method: HttpRequestMethod,
  headers?: HttpHeaders,
) => {
  function* generator(body?: TBody): SagaIterator {
    let finalUrl = url as string;

    if (body && typeof url === 'function') {
      finalUrl = (url as UrlGenerator<TBody>)(body);
    }

    const authHeader = yield call(getAuthHeader);

    return yield call(httpRequest, finalUrl, method, body, { ...headers, ...authHeader });
  }

  return {
    generator,
    call: (a: TResponse): TResponse => a,
  };
};
