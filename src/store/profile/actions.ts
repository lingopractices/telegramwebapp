import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { GoogleReauth } from './features/google-reauth/google-reauth';
import { CancelUpdateProfile } from './features/update-profile/cancel-update-profile';
import { UpdateProfile } from './features/update-profile/update-profile';

export const getProfileAction = GetProfile.action;
export const updateProfileAction = UpdateProfile.action;
export const changeThemeAction = ChangeTheme.action;
export const cancelUpdateProfileAction = CancelUpdateProfile.action;
export const getGoogleReauthLink = GoogleReauth.action;
