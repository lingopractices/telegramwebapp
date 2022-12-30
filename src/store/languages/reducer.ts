import { createReducer } from '@reduxjs/toolkit';

import { GetLanguages } from './features/get-languages/get-languages';
import { GetLanguagesFailure } from './features/get-languages/get-languages-failure';
import { GetLanguagesSuccess } from './features/get-languages/get-languages-success';
import { ILanguagesState } from './types';

const initialState: ILanguagesState = {
  languages: [],
  requests: {
    getLanguagesPending: false,
  },
};

const reducer = createReducer<ILanguagesState>(initialState, (builder) =>
  builder
    .addCase(GetLanguages.action, GetLanguages.reducer)
    .addCase(GetLanguagesSuccess.action, GetLanguagesSuccess.reducer)
    .addCase(GetLanguagesFailure.action, GetLanguagesFailure.reducer),
);

export default reducer;
