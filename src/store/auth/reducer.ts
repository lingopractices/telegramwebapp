import { createReducer } from '@reduxjs/toolkit';

import { IAuthState } from './auth-state';
import { AuthInit } from './features/init-auth/init-auth';

const securityToken = window.Telegram.WebApp.initData;

const initialState: IAuthState = {
  isAuthenticated: false,
  securityToken,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(AuthInit.action, AuthInit.reducer);
});

export default reducer;
