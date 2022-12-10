import { all, call } from 'redux-saga/effects';

import { alertsSagas } from './alerts/sagas';
import { initSaga } from './initiation/sagas';
import { languagesSagas } from './languages/sagas';
import { meetingSagas } from './meetings/sagas';
import { profileSagas } from './profile/sagas';
import { topicSagas } from './topics/sagas';

function* rootSaga() {
  yield all([
    call(initSaga),
    call(profileSagas),
    call(meetingSagas),
    call(topicSagas),
    call(languagesSagas),
    call(alertsSagas),
  ]);
}

export default rootSaga;
