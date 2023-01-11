import { IUser } from 'lingopractices-models';

import { Theme } from './features/models/theme';

export interface IProfileState {
  profileInfo?: IUser;
  theme?: Theme;
  speeches: Record<string, string[]>;
  requests: {
    getProfileInfoPending: boolean;
    updateProfilePending: boolean;
  };
}
