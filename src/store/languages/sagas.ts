import { all, takeLatest } from 'redux-saga/effects';

import { GetLanguages } from './features/get-languages/get-languages';

export function* languagesSagas() {
  yield all([takeLatest(GetLanguages.action, GetLanguages.saga)]);
}
