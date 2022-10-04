import { createReducer } from '@reduxjs/toolkit';

import { GetProfileRequest } from './features/get-profile/get-profile-request';
import { GetProfileSuccess } from './features/get-profile/get-profile-success';
import { UpdateProfileRequest } from './features/update-profile/update-profile-request';
import { UpdateProfileSuccess } from './features/update-profile/update-profile-success';
import { IProfileState } from './types';

const initialState: IProfileState = {
  profileInfo: undefined,
  isLoading: false,
};

const reducer = createReducer<IProfileState>(initialState, (builder) => {
  builder
    .addCase(GetProfileRequest.action, GetProfileRequest.reducer)
    .addCase(GetProfileSuccess.action, GetProfileSuccess.reducer)
    .addCase(UpdateProfileRequest.action, UpdateProfileRequest.reducer)
    .addCase(UpdateProfileSuccess.action, UpdateProfileSuccess.reducer);
});

export default reducer;
