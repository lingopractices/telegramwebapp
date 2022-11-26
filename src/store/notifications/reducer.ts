import { createReducer } from '@reduxjs/toolkit';

import { RemoveNotification } from './features/remove-notification';
import { SetNotification } from './features/set-notification';
import { INotifications } from './types';

const initialState: INotifications = {
  curentNotification: undefined,
  allNotifications: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SetNotification.action, SetNotification.reducer)
    .addCase(RemoveNotification.action, RemoveNotification.reducer);
});

export default reducer;
