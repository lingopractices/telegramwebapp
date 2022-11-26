import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';

export class UpdateProfileFailure {
  static get action() {
    return createAction('profile/UPDATE_PROFILE_FAILURE');
  }

  static get reducer() {
    return (draft: IProfileState) => {
      draft.requests.updateProfilePending = false;
      return draft;
    };
  }
}
