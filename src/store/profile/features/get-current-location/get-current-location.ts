import * as Sentry from '@sentry/react';
import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { ABSTRACT_API } from '@store/common/path';
import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { IAbstractResponse } from './types';

export class GetCurrentLocation {
  static get action() {
    return createDeferredAction('profile/GET_CURRENT_LOCATION');
  }

  static get saga() {
    return function* ({ meta }: ReturnType<typeof GetCurrentLocation.action>): SagaIterator {
      try {
        const { data } = GetCurrentLocation.httpRequest.call(
          yield call(() => GetCurrentLocation.httpRequest.generator()),
        );

        const { city, country: countryName, timezone } = data;

        meta?.deferred.resolve({ city, countryName, timeZoneId: timezone.name });
      } catch (e: any) {
        Sentry.captureEvent(e.message, import.meta.env.VITE_ABSTRACT_API_KEY);
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IAbstractResponse>, undefined>(
      ABSTRACT_API,
      HttpRequestMethod.Get,
      undefined,
      true,
    );
  }
}
