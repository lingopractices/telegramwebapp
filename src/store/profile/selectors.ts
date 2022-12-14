import { RootState } from 'store/store';

export const getProfileDataSelector = (state: RootState) => state.profile.profileInfo;

export const getInterfaceLanguageSelector = (state: RootState) =>
  state.profile.profileInfo?.interfaceLanguage;

export const getPracticeLanguageSelector = (state: RootState) =>
  state.profile.profileInfo?.practiceLanguage;

export const getLanguageLevelSelector = (state: RootState) =>
  state.profile.profileInfo?.languageLevel;

export const pendingUpdateUserSelector = (state: RootState) =>
  state.profile.requests.updateProfilePending;

export const themeSelector = (state: RootState) => state.profile.theme;

export const locationSelector = (state: RootState) => state.profile.profileInfo?.countryName;

export const speechesSelector = (state: RootState) => state.profile.speeches;

export const speechesByLocaleSelector = (locale?: string) => (state: RootState) =>
  state.profile.speeches[locale || ''];
