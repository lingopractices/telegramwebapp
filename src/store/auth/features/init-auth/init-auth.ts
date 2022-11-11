import { createAction } from '@reduxjs/toolkit';
import { IAuthState } from '@store/auth/auth-state';

export class AuthInit {
  static get action() {
    return createAction('AUTH_INIT');
  }

  static get reducer() {
    return (draft: IAuthState) => {
      draft.isAuthenticated = true;
    };
  }
}
