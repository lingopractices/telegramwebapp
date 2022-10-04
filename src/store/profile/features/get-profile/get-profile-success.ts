import { createAction } from '@reduxjs/toolkit';
import { IUser } from 'lingopractices-models';
import { IProfileState } from 'store/profile/types';

export class GetProfileSuccess {
  static get action() {
    return createAction<IUser>('profile/GET_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof GetProfileSuccess.action>) => {
      draft.isLoading = false;
      draft.profileInfo = { ...payload };

      return draft;
    };
  }
}
