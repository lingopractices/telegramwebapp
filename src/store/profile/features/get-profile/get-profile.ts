import { createAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IUser } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { httpRequestFactory } from 'store/common/http-request-factory';
import { HttpRequestMethod } from 'store/common/http-request-method';
import { MAIN_API } from 'store/common/path';
import { IProfileState } from 'store/profile/types';
import { replaceInUrl } from 'utils/replace-in-url';

import { GetProfileSuccess } from './get-profile-success';

export class GetProfile {
  static get action() {
    return createAction('profile/GET_PROFILE');
  }

  static get reducer() {
    return (draft: IProfileState) => {
      draft.requests.getProfileInfoPending = true;
    };
  }

  static get saga() {
    return function* (): SagaIterator {
      const { data } = GetProfile.httpRequest.call(
        yield call(
          () => GetProfile.httpRequest.generator(1222183809), // temporary id placeholder 390447649
        ),
      );

      yield put(GetProfileSuccess.action(data));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IUser>, number>(
      (telegramUserId: number) =>
        replaceInUrl(MAIN_API.GET_USER_BY_TELEGRAM_USER_ID, ['telegramUserId', telegramUserId]),
      HttpRequestMethod.Get,
    );
  }
}
