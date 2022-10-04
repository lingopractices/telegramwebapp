import { createReducer } from '@reduxjs/toolkit';

import { GetProfile } from './features/get-profile/get-profile';
import { GetProfileSuccess } from './features/get-profile/get-profile-success';
import { IProfileState } from './types';

const initialState: IProfileState = {
  profileInfo: undefined,
  isLoading: false,
};

const reducer = createReducer<IProfileState>(initialState, (builder) => {
  builder
    .addCase(GetProfile.action, GetProfile.reducer)
    .addCase(GetProfileSuccess.action, GetProfileSuccess.reducer);
});

export default reducer;
