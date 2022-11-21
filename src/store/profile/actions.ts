import { ChangeTheme } from './features/change-theme/change-theme';
import { GetProfile } from './features/get-profile/get-profile';
import { UpdateProfile } from './features/update-profile/update-profile';

export const getProfileAction = GetProfile.action;
export const updateProfileAction = UpdateProfile.action;
export const changeThemeAction = ChangeTheme.action;
