import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { httpRequest } from './http-request';
import { HttpRequestMethod } from './http-request-method';
import { HttpHeaders, UrlGenerator } from './types';

export const httpRequestFactory = <TResponse, TBody>(
  url: string | UrlGenerator<TBody>,
  method: HttpRequestMethod,
  headers?: HttpHeaders,
) => {
  function* generator(body?: TBody): SagaIterator {
    try {
      let finalUrl = url as string;

      if (body && typeof url === 'function') {
        finalUrl = (url as UrlGenerator<TBody>)(body);
      }

      return yield call(httpRequest, finalUrl, method, body, headers);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
    return undefined;
  }

  return {
    generator,
    call: (a: TResponse): TResponse => a,
  };
};
