import { createReducer } from '@reduxjs/toolkit';

import { InternetConnected } from './internet-connection-check/internet-connected';
import { InternetDisconnected } from './internet-connection-check/internet-disconnected';
import { IInternetState } from './internet-state';

const initialState: IInternetState = {
  isInternetConnected:
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true,
};

const reducer = createReducer<IInternetState>(initialState, (builder) =>
  builder
    .addCase(InternetConnected.action, InternetConnected.reducer)
    .addCase(InternetDisconnected.action, InternetDisconnected.reducer),
);

export default reducer;
