import { ILanguage } from 'lingopractices-models';

export interface ILanguagesState {
  languages: ILanguage[];
  requests: {
    getLanguagesPending: boolean;
  };
}
