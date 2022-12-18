import { createAction } from '@reduxjs/toolkit';
import { IProfileState } from '@store/profile/types';
import { removeRequest } from '@utils/cancel-request';
import { IUser } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

export class UpdateProfileSuccess {
  static get action() {
    return createAction<IUser>('profile/UPDATE_PROFILE_SUCCESS');
  }

  static get reducer() {
    return (draft: IProfileState, { payload }: ReturnType<typeof UpdateProfileSuccess.action>) => {
      draft.profileInfo = payload;
      draft.requests.updateProfilePending = false;

      return draft;
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof UpdateProfileSuccess.action>): SagaIterator {
      const { id } = action.payload;
      yield call(removeRequest, id);
    };
  }
}
