import { all, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';

import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { GetProfileSuccess } from './features/get-profile/get-profile-success';
import { GetUserTheme } from './features/get-user-theme/get-user-theme';
import { GoogleReauth } from './features/google-reauth/google-reauth';
import { CancelUpdateProfile } from './features/update-profile/cancel-update-profile';
import { UpdateProfile } from './features/update-profile/update-profile';
import { UpdateProfileSuccess } from './features/update-profile/update-profile-success';

export function* profileSagas() {
  yield all([
    takeLatest(GetProfile.action, GetProfile.saga),
    takeLatest(UpdateProfile.action, UpdateProfile.saga),
    takeLatest(UpdateProfileSuccess.action, UpdateProfileSuccess.saga),
    takeLatest(ChangeTheme.action, ChangeTheme.saga),
    takeLeading(GetUserTheme.action, GetUserTheme.saga),
    takeLeading(GetProfileSuccess.action, GetProfileSuccess.saga),
    takeEvery(CancelUpdateProfile.action, CancelUpdateProfile.saga),
    takeEvery(GoogleReauth.action, GoogleReauth.saga),
  ]);
}
