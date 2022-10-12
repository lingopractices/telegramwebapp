import { RootState } from '@store/store';

export const languagesSelector = (state: RootState) => state.languages.languages;
