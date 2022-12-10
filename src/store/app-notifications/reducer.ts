import { createReducer } from '@reduxjs/toolkit';

import { RemoveNotification } from './features/remove-notification';
import { SetNotification } from './features/set-notification';
import { IAppNotifications } from './types';

const initialState: IAppNotifications = {
  curentNotification: undefined,
  allNotifications: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SetNotification.action, SetNotification.reducer)
    .addCase(RemoveNotification.action, RemoveNotification.reducer);
});

export default reducer;
