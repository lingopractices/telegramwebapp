import { all, takeLatest } from 'redux-saga/effects';

import { GetProfile } from './features/get-profile/get-profile';
import { UpdateProfile } from './features/update-profile/update-profile';

export function* profileSagas() {
  yield all([
    takeLatest(GetProfile.action, GetProfile.saga),
    takeLatest(UpdateProfile.action, UpdateProfile.saga),
  ]);
}
