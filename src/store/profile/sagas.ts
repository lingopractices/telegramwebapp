import { all, takeLatest, takeLeading } from 'redux-saga/effects';

import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { GetUserTheme } from './features/get-user-theme/get-user-theme';
import { UpdateProfile } from './features/update-profile/update-profile';

export function* profileSagas() {
  yield all([
    takeLatest(GetProfile.action, GetProfile.saga),
    takeLatest(UpdateProfile.action, UpdateProfile.saga),
    takeLatest(ChangeTheme.action, ChangeTheme.saga),
    takeLeading(GetUserTheme.action, GetUserTheme.saga),
  ]);
}
