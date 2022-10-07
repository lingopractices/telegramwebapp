import { all, takeLatest } from 'redux-saga/effects';

import { GetLanguagesRequest } from './features/get-languages/get-languages-request';

export function* languagesSaga() {
  yield all([takeLatest(GetLanguagesRequest.action, GetLanguagesRequest.saga)]);
}
