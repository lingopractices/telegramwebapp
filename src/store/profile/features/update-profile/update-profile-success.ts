import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';
import { IUser } from 'lingopractices-models';

export class UpdateProfileSuccess {
  static get action() {
    return createAction<IUser>('profile/UPDATE_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof UpdateProfileSuccess.action>) => {
      draft.profileInfo = payload;

      return draft;
    };
  }
}
