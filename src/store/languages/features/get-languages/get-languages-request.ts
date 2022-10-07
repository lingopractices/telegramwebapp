import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ILanguagesState } from '@store/languages/types';
import { call, put } from 'redux-saga/effects';

import { GetLanguagesSuccess } from './get-languages-success';

export class GetLanguagesRequest {
  static get action() {
    return createAction('languages/GET_LANGUAGES_REQUEST');
  }

  static get reducer() {
    return (draft: ILanguagesState) => {
      draft.requests.getLanguagesPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* getLanguages() {
      const { data } = yield call(() => GetLanguagesRequest.httpRequest.generator());

      if (data) {
        yield put(GetLanguagesSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory(MAIN_API.GET_LANGUAGES, HttpRequestMethod.Get);
  }
}
