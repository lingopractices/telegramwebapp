import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';

interface IGetSpeechesSuccessPayload {
  locale: string;
  data: string[];
}

export class GetSpeechesSuccess {
  static get action() {
    return createAction<IGetSpeechesSuccessPayload>('profile/GET_SPEECHES_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof GetSpeechesSuccess.action>) => {
      const { locale, data } = payload;

      draft.speeches = { ...draft.speeches, [locale]: data };
      return draft;
    };
  }
}
