import { IUser } from 'lingopractices-models';

export interface IProfileState {
  profileInfo?: IUser;
  isLoading: boolean;
}
