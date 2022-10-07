import { combineReducers } from '@reduxjs/toolkit';

import meetings from './meetings/reducer';
import profile from './profile/reducer';
import topics from './topics/reducer';

const rootReducer = combineReducers({
  profile,
  meetings,
  topics,
});

export default rootReducer;
