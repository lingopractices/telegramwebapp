import { RootState } from '@store/store';

export const languagesSelector = (state: RootState) => state.languages.languages;
export const languagePendingSelector = (state: RootState) =>
  state.languages.requests.getLanguagesPending;

export const languageByIdSelector = (id?: string) => (state: RootState) =>
  state.languages.languages.find((language) => language.id === id);
