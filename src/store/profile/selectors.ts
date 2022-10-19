import { RootState } from 'store/store';

export const getProfileDataSelector = (state: RootState) => state.profile.profileInfo;

export const getInterfaceLanguageSelector = (state: RootState) =>
  state.profile.profileInfo?.interfaceLanguage;
export const getPracticeLanguageSelector = (state: RootState) =>
  state.profile.profileInfo?.practiceLanguage;

export const getLanguageLevelSelector = (state: RootState) =>
  state.profile.profileInfo?.languageLevel;

export const getGenderSelector = (state: RootState) => state.profile.profileInfo?.gender;

export const getCountrySelector = (state: RootState) => state.profile.profileInfo?.countryName;

export const pendingUpdateUserSelector = (state: RootState) =>
  state.profile.requests.updateProfilePending;
