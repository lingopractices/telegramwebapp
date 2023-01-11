import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { getInterfaceLanguageSelector, speechesSelector } from '@store/profile/selectors';
import { replaceInUrl } from '@utils/replace-in-url';
import { AxiosResponse } from 'axios';
import { ILanguage } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { GetSpeechesSuccess } from './get-speeches-success';

export class GetSpeeches {
  static get action() {
    return createAction('profile/GET_SPEECHES');
  }

  static get saga() {
    return function* (): SagaIterator {
      const locale: ILanguage = yield select(getInterfaceLanguageSelector);
      const speeches: Record<string, string[]> = yield select(speechesSelector);

      if (!speeches[locale.id]) {
        try {
          const { data } = GetSpeeches.httpRequest.call(
            yield call(() => GetSpeeches.httpRequest.generator({ locale: locale.id })),
          );

          yield put(GetSpeechesSuccess.action({ locale: locale.id, data }));
        } catch (e) {
          //
        }
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<string[]>, { locale: string }>(
      ({ locale }: { locale: string }) =>
        replaceInUrl(MAIN_API.GET_CREATE_MEETING_CONTENT, ['locale', locale]),
      HttpRequestMethod.Get,
    );
  }
}
