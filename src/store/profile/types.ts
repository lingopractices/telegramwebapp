import { IUser } from 'lingopractices-models';

import { Theme } from './features/models/theme';

export interface IProfileState {
  profileInfo?: IUser;
  theme: Theme;
  requests: {
    getProfileInfoPending: boolean;
    updateProfilePending: boolean;
  };
}
