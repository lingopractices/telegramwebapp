import { IUser } from 'lingopractices-models';

export interface IProfileState {
  profileInfo?: IUser;
  requests: {
    getProfileInfoPending: boolean;
    updateProfilePending: boolean;
  };
}
