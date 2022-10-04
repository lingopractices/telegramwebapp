import { combineReducers } from '@reduxjs/toolkit';

import profile from './profile/reducer';

const rootReducer = combineReducers({
  profile,
});

export default rootReducer;
