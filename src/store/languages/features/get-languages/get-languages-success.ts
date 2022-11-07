import { createAction } from '@reduxjs/toolkit';
import { ILanguagesState } from '@store/languages/types';
import { ILanguage } from 'lingopractices-models';
import { apply } from 'redux-saga/effects';
import { LanguageService } from 'services/LanguageService';

export class GetLanguagesSuccess {
  static get action() {
    return createAction<ILanguage[]>('languages/GET_LANGUAGES_SUCCESS');
  }

  static get reducer() {
    return (draft: ILanguagesState, { payload }: ReturnType<typeof GetLanguagesSuccess.action>) => {
      draft.requests.getLanguagesPending = false;

      draft.languages = payload;

      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof GetLanguagesSuccess.action>) {
      const languageService = new LanguageService();
      yield apply(languageService, languageService.initializeOrUpdate, [payload]);
    };
  }
}
