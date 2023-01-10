import { ChangeTheme } from './features/change-theme/change-theme';
import { GetCurrentLocation } from './features/get-current-location/get-current-location';
import { GetProfile } from './features/get-profile/get-profile';
import { GetTimeZone } from './features/get-time-zone/get-time-zone';
import { GoogleReAuth } from './features/google-reauth/google-reauth';
import { CancelUpdateProfile } from './features/update-profile/cancel-update-profile';
import { UpdateProfile } from './features/update-profile/update-profile';

export const getProfileAction = GetProfile.action;
export const updateProfileAction = UpdateProfile.action;
export const changeThemeAction = ChangeTheme.action;
export const cancelUpdateProfileAction = CancelUpdateProfile.action;
export const getGoogleReauthLink = GoogleReAuth.action;
export const getCurrentLocationAction = GetCurrentLocation.action;
export const getTimeZoneAction = GetTimeZone.action;
