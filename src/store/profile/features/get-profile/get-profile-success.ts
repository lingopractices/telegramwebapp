import { createAction } from '@reduxjs/toolkit';
import { IUser } from 'lingopractices-models';
import i18n from 'localization/i18n';
import { IProfileState } from 'store/profile/types';

export class GetProfileSuccess {
  static get action() {
    return createAction<IUser>('profile/GET_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof GetProfileSuccess.action>) => {
      draft.requests.getProfileInfoPending = false;
      draft.profileInfo = { ...payload };
      i18n.changeLanguage(payload.interfaceLanguage.id);

      return draft;
    };
  }
}
