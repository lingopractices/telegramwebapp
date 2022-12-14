import { createReducer } from '@reduxjs/toolkit';

import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { GetProfileSuccess } from './features/get-profile/get-profile-success';
import { GetSpeechesSuccess } from './features/get-speeches/get-speeches-success';
import { UpdateProfile } from './features/update-profile/update-profile';
import { UpdateProfileFailure } from './features/update-profile/update-profile-failure';
import { UpdateProfileSuccess } from './features/update-profile/update-profile-success';
import { IProfileState } from './types';

const initialState: IProfileState = {
  profileInfo: undefined,
  theme: undefined,
  speeches: {},
  requests: {
    getProfileInfoPending: false,
    updateProfilePending: false,
  },
};

const reducer = createReducer<IProfileState>(initialState, (builder) => {
  builder
    .addCase(GetProfile.action, GetProfile.reducer)
    .addCase(GetProfileSuccess.action, GetProfileSuccess.reducer)
    .addCase(UpdateProfile.action, UpdateProfile.reducer)
    .addCase(UpdateProfileSuccess.action, UpdateProfileSuccess.reducer)
    .addCase(UpdateProfileFailure.action, UpdateProfileFailure.reducer)
    .addCase(ChangeTheme.action, ChangeTheme.reducer)
    .addCase(GetSpeechesSuccess.action, GetSpeechesSuccess.reducer);
});

export default reducer;
