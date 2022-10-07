import { all, call } from 'redux-saga/effects';

import { meetingsSaga } from './meetings/sagas';
import { profileSaga } from './profile/sagas';
import { topicsSaga } from './topics/sagas';

function* rootSaga() {
  yield all([call(profileSaga), call(meetingsSaga), call(topicsSaga)]);
}

export default rootSaga;
