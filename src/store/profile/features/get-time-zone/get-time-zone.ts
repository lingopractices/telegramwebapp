import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { GOOGLE_API } from '@store/common/path';
import { replaceInUrl } from '@utils/replace-in-url';
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
          yield call(() =>
            GetTimeZone.httpRequest.generator({
              lat,
              lng,
              timeStamp: dayjs().unix(),
              apiKey: import.meta.env.VITE_GOOGLE_TIME_ZONE_KEY,
            }),
          ),
        );

        const { timeZoneId } = data;

        meta?.deferred.resolve(timeZoneId);
      } catch (e: any) {
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<
      AxiosResponse<TimeZoneResponseType>,
      { lat: number; lng: number; timeStamp: number; apiKey: string }
    >(
      ({ lat, lng, timeStamp, apiKey }) =>
        replaceInUrl(
          GOOGLE_API.GET_TIMEZONE,
          ['lat', lat],
          ['lng', lng],
          ['timeStamp', timeStamp],
          ['apiKey', apiKey],
        ),
      HttpRequestMethod.Get,
      undefined,
      true,
    );
  }
}
