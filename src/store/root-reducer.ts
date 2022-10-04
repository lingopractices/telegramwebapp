import { combineReducers } from '@reduxjs/toolkit';

import meetings from './meetings/reducer';
import profile from './profile/reducer';

const rootReducer = combineReducers({
  profile,
  meetings,
});

export default rootReducer;
