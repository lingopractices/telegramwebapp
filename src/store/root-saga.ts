import { all, call } from 'redux-saga/effects';

import { languagesSagas } from './languages/sagas';
import { meetingSagas } from './meetings/sagas';
import { profileSagas } from './profile/sagas';
import { topicSagas } from './topics/sagas';

function* rootSaga() {
  yield all([call(profileSagas), call(meetingSagas), call(topicSagas), call(languagesSagas)]);
}

export default rootSaga;
