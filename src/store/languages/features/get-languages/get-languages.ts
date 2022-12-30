import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { ILanguagesState } from '@store/languages/types';
import { AxiosResponse } from 'axios';
import { ILanguage } from 'lingopractices-models';
import { call, put } from 'redux-saga/effects';
import { LanguageService } from 'services/LanguageService';

import { GetLanguagesFailure } from './get-languages-failure';
import { GetLanguagesSuccess } from './get-languages-success';

export class GetLanguages {
  static get action() {
    return createDeferredAction('languages/GET_LANGUAGES');
  }

  static get reducer() {
    return (draft: ILanguagesState) => {
      draft.requests.getLanguagesPending = true;

      return draft;
    };
  }

  static get saga() {
    return function* ({ meta }: ReturnType<typeof GetLanguages.action>) {
      const languages: ILanguage[] = new LanguageService().languages || [];

      if (!languages.length) {
        try {
          const { data } = GetLanguages.httpRequest.call(
            yield call(() => GetLanguages.httpRequest.generator()),
          );

          yield put(GetLanguagesSuccess.action(data));
        } catch (e) {
          yield put(GetLanguagesFailure.action());
          meta?.deferred.reject(e);
        }
      } else {
        yield put(GetLanguagesSuccess.action(languages));
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
