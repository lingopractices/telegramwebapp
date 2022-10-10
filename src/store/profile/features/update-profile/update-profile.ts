import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IProfileState } from '@store/profile/types';
import { IUpdateUserRequest } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetProfileRequest } from '../get-profile/get-profile';

import { UpdateProfileSuccess } from './update-profile-success';

export class UpdateProfileRequest {
  static get action() {
    return createAction<IUpdateUserRequest>('profile/UPDATE_PROFILE_REQUEST');
  }

  static get reducer() {
    return (draft: IProfileState) => draft;
  }

  static get saga() {
    return function* updateProfileSaga({
      payload,
    }: ReturnType<typeof UpdateProfileRequest.action>) {
      yield call(() => UpdateProfileRequest.httpRequest.generator(payload));

      yield put(UpdateProfileSuccess.action());
      yield put(GetProfileRequest.action());
    };
  }

  static get httpRequest() {
    return httpRequestFactory<null, IUpdateUserRequest>(
      MAIN_API.UPDATE_USER,
      HttpRequestMethod.Put,
    );
  }
}
