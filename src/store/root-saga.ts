import { all, call } from 'redux-saga/effects';

import { meetingSagas } from './meetings/sagas';
import { profileSagas } from './profile/sagas';
import { topicSagas } from './topics/sagas';

function* rootSaga() {
  yield all([call(profileSagas), call(meetingSagas), call(topicSagas)]);
}

export default rootSaga;
