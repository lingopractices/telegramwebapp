import { createAction } from '@reduxjs/toolkit';
import { GetAlerts } from '@store/alerts/features/get-alerts/get-alerts';
import { AuthInit } from '@store/auth/features/init-auth/init-auth';
import { GetMyMeetings } from '@store/meetings/features/get-my-meetings/get-my-meetings';
import { AxiosResponse } from 'axios';
import { IUser } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { httpRequestFactory } from 'store/common/http-request-factory';
import { HttpRequestMethod } from 'store/common/http-request-method';
import { MAIN_API } from 'store/common/path';
import { IProfileState } from 'store/profile/types';

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
        yield call(() => GetProfile.httpRequest.generator()),
      );

      yield put(GetProfileSuccess.action(data));
      yield put(GetMyMeetings.action());
      yield put(AuthInit.action());
      yield put(GetAlerts.action());
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IUser>, number>(
      MAIN_API.GET_USER,
      HttpRequestMethod.Get,
    );
  }
}
