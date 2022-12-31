import { RootState } from '@store/store';

export const getInternetStateSelector = (state: RootState): boolean =>
  state.internet.isInternetConnected;
