import { Gender, LanguageLevel } from 'lingopractices-models';

export const genderLabelsMap: Record<Gender, string> = {
  [Gender.NotSet]: 'Not set',
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
};

export const levelLabelsMap: Record<LanguageLevel, string> = {
  [LanguageLevel.Beginner]: 'Beginner',
  [LanguageLevel.PreIntermediate]: 'Pre-Intermediate',
  [LanguageLevel.Intermediate]: 'Intermediate',
  [LanguageLevel.UpperIntermediate]: 'Upper-Intermediate',
  [LanguageLevel.Advanced]: 'Advanced',
  [LanguageLevel.Proficiency]: 'Proficiency',
};
