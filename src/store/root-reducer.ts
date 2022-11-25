import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth/reducer';
import languages from './languages/reducer';
import meetings from './meetings/reducer';
import notifications from './notifications/reducer';
import profile from './profile/reducer';
import topics from './topics/reducer';

const rootReducer = combineReducers({
  auth,
  profile,
  meetings,
  topics,
  languages,
  notifications,
});

export default rootReducer;
