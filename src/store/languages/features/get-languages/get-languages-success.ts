import { createAction } from '@reduxjs/toolkit';
import { ILanguagesState } from '@store/languages/types';
import { ILanguage } from 'lingopractices-models';

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
}
