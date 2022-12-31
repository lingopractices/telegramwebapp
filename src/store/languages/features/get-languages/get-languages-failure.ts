import { createAction } from '@reduxjs/toolkit';
import { ILanguagesState } from '@store/languages/types';

export class GetLanguagesFailure {
  static get action() {
    return createAction('meetings/GET_LANGUAGES_FAILURE');
  }

  static get reducer() {
    return (draft: ILanguagesState) => {
      draft.requests.getLanguagesPending = false;
      return draft;
    };
  }
}
