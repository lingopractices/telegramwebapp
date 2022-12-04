import { ILanguage, LanguageLevel } from 'lingopractices-models';

// dayjs formats
export const HOUR_MINUTE = 'HH:mm';
export const DAY_MONTH_YAER = 'DD.MM.YYYY';
export const MONTH_YAER = 'MM.YYYY';
export const FULL_DATE = 'YYYY-MM-DDTHH:mm:ss';

export const interfaceLanguages: ILanguage[] = [
  { id: 'ru', name: 'Russian' },
  { id: 'en', name: 'English' },
];

export const popularLanguagesIds: string[] = ['ru', 'en', 'es', 'fr', 'de', 'it', 'tr', 'zh'];

export const allLevels = [
  { id: LanguageLevel.Beginner },
  { id: LanguageLevel.PreIntermediate },
  { id: LanguageLevel.Intermediate },
  { id: LanguageLevel.UpperIntermediate },
  { id: LanguageLevel.Advanced },
  { id: LanguageLevel.Proficiency },
];

export const participantsCountIds: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ANIMATION_DURATION = 200;
export const NOTIFICATION_DURATON = 2000;
export const SCROLL_TOP = 70;
export const SCROLL_DOWN = 0;
