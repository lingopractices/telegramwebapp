import axios, { AxiosRequestConfig } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { HttpRequestMethod } from './http-request-method';

import type { HttpHeaders } from './types';

export function* httpRequest<TBody>(
  url: string,
  method: HttpRequestMethod,
  body?: TBody,
  headers?: HttpHeaders,
): SagaIterator {
  const requestConfig: AxiosRequestConfig = {
    url,
    method,
    responseType: 'json',
    headers,
  };

  switch (method) {
    case HttpRequestMethod.Get:
      break;
    case HttpRequestMethod.Post:
      requestConfig.data = body;
      break;
    case HttpRequestMethod.Put:
      requestConfig.data = body;
      break;
    case HttpRequestMethod.Delete:
      break;
    default:
      throw new Error('Unknown method.');
  }

  try {
    return yield call(axios.create().request, requestConfig);
  } catch (e: any) {
    if (e.message) {
      throw e;
    }
  }

  return undefined;
}
