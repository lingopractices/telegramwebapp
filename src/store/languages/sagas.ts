import { all, takeLatest } from 'redux-saga/effects';

import { GetLanguages } from './features/get-languages/get-languages';
import { GetLanguagesSuccess } from './features/get-languages/get-languages-success';

export function* languagesSagas() {
  yield all([
    takeLatest(GetLanguages.action, GetLanguages.saga),
    takeLatest(GetLanguagesSuccess.action, GetLanguagesSuccess.saga),
  ]);
}
