import { all, takeLatest } from 'redux-saga/effects';

import { GetProfileRequest } from './features/get-profile/get-profile-request';
import { UpdateProfileRequest } from './features/update-profile/update-profile-request';

export function* profileSaga() {
  yield all([
    takeLatest(GetProfileRequest.action, GetProfileRequest.saga),
    takeLatest(UpdateProfileRequest.action, UpdateProfileRequest.saga),
  ]);
}
