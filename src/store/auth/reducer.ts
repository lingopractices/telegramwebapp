import { createReducer } from '@reduxjs/toolkit';

import { IAuthState } from './auth-state';

const securityToken = window.Telegram.WebApp.initData;

const initialState: IAuthState = {
  isAuthenticated: false,
  securityToken,
};

const reducer = createReducer(initialState, (builder) => {});

export default reducer;
