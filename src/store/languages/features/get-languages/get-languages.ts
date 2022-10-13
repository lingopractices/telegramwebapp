import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ILanguagesState } from '@store/languages/types';
import { AxiosResponse } from 'axios';
import { ILanguage } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';

import { GetLanguagesSuccess } from './get-languages-success';

export class GetLanguages {
  static get action() {
    return createAction('languages/GET_LANGUAGES');
  }

  static get reducer() {
    return (draft: ILanguagesState) => {
      draft.requests.getLanguagesPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* () {
      const { data } = GetLanguages.httpRequest.call(
        yield call(() => GetLanguages.httpRequest.generator()),
      );

      if (data) {
        yield put(GetLanguagesSuccess.action(data));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<ILanguage[]>, null>(
      MAIN_API.GET_LANGUAGES,
      HttpRequestMethod.Get,
    );
  }
}
