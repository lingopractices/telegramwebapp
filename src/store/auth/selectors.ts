import { RootState } from '@store/store';

export const securityTokenSelector = (state: RootState) => state.auth.securityToken;
