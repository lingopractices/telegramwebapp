import { all, call } from 'redux-saga/effects';

import { profileSaga } from './profile/sagas';

function* rootSaga() {
  yield all([call(profileSaga)]);
}

export default rootSaga;
