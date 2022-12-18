import axios, { CancelTokenSource } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, cancelled } from 'redux-saga/effects';

import { getAuthHeader } from './getAuthHeader';
import { httpRequest } from './http-request';
import { HttpRequestMethod } from './http-request-method';
import { HttpHeaders, UrlGenerator } from './types';

export const httpRequestFactory = <TResponse, TBody>(
  url: string | UrlGenerator<TBody>,
  method: HttpRequestMethod,
  headers?: HttpHeaders,
) => {
  function* generator(
    body?: TBody,
    assignCancelToken?: (token: CancelTokenSource) => void,
  ): SagaIterator {
    let cancelTokenSource: CancelTokenSource | null = null;

    try {
      let finalUrl = url as string;

      if (body && typeof url === 'function') {
        finalUrl = (url as UrlGenerator<TBody>)(body);
      }

      const authHeader = yield call(getAuthHeader);
      cancelTokenSource = axios.CancelToken.source();

      if (assignCancelToken) {
        assignCancelToken(cancelTokenSource);
      }

      return yield call(httpRequest, finalUrl, method, body, cancelTokenSource.token, {
        ...headers,
        ...authHeader,
      });
    } finally {
      if (yield cancelled()) {
        if (cancelTokenSource) {
          cancelTokenSource.cancel();
        }
      }
    }
  }

  return {
    generator,
    call: (a: TResponse): TResponse => a,
  };
};
