import { levelLabelsMap } from '@utils/enumLabelsMap';
import { ILanguage, LanguageLevel } from 'lingopractices-models';

// dayjs formats
export const HOUR_MINUTE = 'HH:mm';
export const DAY_MONTH_YAER = 'DD.MM.YYYY';

export const interfaceLanguages: ILanguage[] = [
  { id: 'ru', name: 'Russian' },
  { id: 'en', name: 'English' },
];

export const popularLanguagesIds: string[] = ['ru', 'en', 'es', 'fr', 'de', 'it', 'tr', 'zh'];

export const allLevels = [
  { id: LanguageLevel.Beginner, name: levelLabelsMap[LanguageLevel.Beginner] },
  { id: LanguageLevel.PreIntermediate, name: levelLabelsMap[LanguageLevel.PreIntermediate] },
  { id: LanguageLevel.Intermediate, name: levelLabelsMap[LanguageLevel.Intermediate] },
  { id: LanguageLevel.UpperIntermediate, name: levelLabelsMap[LanguageLevel.UpperIntermediate] },
  { id: LanguageLevel.Advanced, name: levelLabelsMap[LanguageLevel.Advanced] },
  { id: LanguageLevel.Proficiency, name: levelLabelsMap[LanguageLevel.Proficiency] },
];
