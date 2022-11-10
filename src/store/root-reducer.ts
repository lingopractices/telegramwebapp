import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth/reducer';
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
});

export default rootReducer;
