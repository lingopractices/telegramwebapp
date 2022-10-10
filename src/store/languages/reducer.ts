import { createReducer } from '@reduxjs/toolkit';

import { GetLanguagesRequest } from './features/get-languages/get-languages';
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
    .addCase(GetLanguagesRequest.action, GetLanguagesRequest.reducer)
    .addCase(GetLanguagesSuccess.action, GetLanguagesSuccess.reducer),
);

export default reducer;
