import { RootState } from 'store/store';

export const getProfileDataSelector = (state: RootState) => state.profile.profileInfo;
