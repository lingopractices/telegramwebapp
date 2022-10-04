import { all, call } from 'redux-saga/effects';

import { meetingsSaga } from './meetings/sagas';
import { profileSaga } from './profile/sagas';

function* rootSaga() {
  yield all([call(profileSaga), call(meetingsSaga)]);
}

export default rootSaga;
