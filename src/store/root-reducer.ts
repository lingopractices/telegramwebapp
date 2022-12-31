import { combineReducers } from '@reduxjs/toolkit';

import alerts from './alerts/reducer';
import notifications from './app-notifications/reducer';
import auth from './auth/reducer';
import internet from './internet/reducer';
import languages from './languages/reducer';
import meetings from './meetings/reducer';
import profile from './profile/reducer';
import topics from './topics/reducer';

const rootReducer = combineReducers({
  auth,
  profile,
  meetings,
  topics,
  languages,
  notifications,
  alerts,
  internet,
});

export default rootReducer;
