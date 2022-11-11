import { RootState } from '@store/store';

export const securityTokenSelector = (state: RootState) => state.auth.securityToken;
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;
