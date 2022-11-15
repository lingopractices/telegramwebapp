import { createAction } from '@reduxjs/toolkit';
import { changeLanguage } from 'i18next';
import { IUser } from 'lingopractices-models';
import i18n from 'localization/i18n';
import { SagaIterator } from 'redux-saga';
import { apply } from 'redux-saga/effects';
import { IProfileState } from 'store/profile/types';

export class GetProfileSuccess {
  static get action() {
    return createAction<IUser>('profile/GET_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof GetProfileSuccess.action>) => {
      draft.requests.getProfileInfoPending = false;
      draft.profileInfo = { ...payload };

      return draft;
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof GetProfileSuccess.action>): SagaIterator {
      const { interfaceLanguage } = action.payload;

      yield apply(i18n, changeLanguage, [interfaceLanguage.id.includes('ru') ? 'ru' : 'en']);
    };
  }
}
