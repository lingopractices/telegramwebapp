import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';

export class UpdateProfileSuccess {
  static get action() {
    return createAction('profile/UPDATE_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof UpdateProfileSuccess.action>) =>
      draft;
  }
}
