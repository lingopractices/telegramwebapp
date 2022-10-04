import { all, takeLatest } from 'redux-saga/effects';

import { GetProfile } from './features/get-profile/get-profile';

export function* profileSaga() {
  yield all([takeLatest(GetProfile.action, GetProfile.saga)]);
}
