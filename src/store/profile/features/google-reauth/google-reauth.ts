import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { AxiosResponse } from 'axios';
import { IGoogleLogInInfo } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

export class GoogleReAuth {
  static get action() {
    return createDeferredAction('profile/GOOGLE_REAUTH');
  }

  static get saga() {
    return function* ({ meta }: ReturnType<typeof GoogleReAuth.action>): SagaIterator {
      try {
        const { data } = GoogleReAuth.httpRequest.call(
          yield call(() => GoogleReAuth.httpRequest.generator()),
        );

        const { logInUrl } = data;

        meta?.deferred.resolve(logInUrl);
      } catch (e) {
        meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IGoogleLogInInfo>, undefined>(
      MAIN_API.GOOGLE_REAUTH,
      HttpRequestMethod.Get,
    );
  }
}
