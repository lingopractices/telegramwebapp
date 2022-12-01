import { ILanguage, ITopic } from 'lingopractices-models';

export const getLanguageById = (languages: ILanguage[], id: string) =>
  languages.find((language) => language.id === id);

export const getTopicById = (topics: ITopic[], id: number) =>
  topics.find((topic) => topic.id === id);
