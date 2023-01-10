import * as Sentry from '@sentry/react';
import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { GOOGLE_API } from '@store/common/path';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { TimeZoneResponseType } from './types';

export class GetTimeZone {
  static get action() {
    return createDeferredAction<Pick<google.maps.LatLngAltitude, 'lat' | 'lng'>>(
      'profile/GET_TIME_ZONE',
    );
  }

  static get saga() {
    return function* ({ meta, payload }: ReturnType<typeof GetTimeZone.action>): SagaIterator {
      const { lat, lng } = payload;
      try {
        const { data } = GetTimeZone.httpRequest.call(
          yield call(() => GetTimeZone.httpRequest.generator({ lat, lng })),
        );

        const { timeZoneId } = data;

        meta?.deferred.resolve(timeZoneId);
      } catch (e: any) {
        Sentry.captureEvent(e);
        Sentry.captureEvent(import.meta.env.VITE_GOOGLE_TIME_ZONE_KEY);
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<TimeZoneResponseType>, { lat: number; lng: number }>(
      ({ lat, lng }: { lat: number; lng: number }) =>
        `${GOOGLE_API.GET_TIMEZONE}${lat}%2C${lng}&timestamp=${dayjs().unix()}&key=${
          import.meta.env.VITE_GOOGLE_TIME_ZONE_KEY
        }`,
      HttpRequestMethod.Get,
      undefined,
      true,
    );
  }
}
