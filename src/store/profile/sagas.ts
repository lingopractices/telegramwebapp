import { all, takeLatest } from 'redux-saga/effects';

import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { UpdateProfile } from './features/update-profile/update-profile';

export function* profileSagas() {
  yield all([
    takeLatest(GetProfile.action, GetProfile.saga),
    takeLatest(UpdateProfile.action, UpdateProfile.saga),
    takeLatest(ChangeTheme.action, ChangeTheme.saga),
  ]);
}
