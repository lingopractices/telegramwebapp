import { LanguageLevel } from 'lingopractices-models';

/* eslint no-bitwise: ["error", { "allow": ["&"] }] */
export const mapLevels = (languageLevels?: LanguageLevel) => {
  if (languageLevels) {
    return [Object.values(LanguageLevel)][0]
      .filter((item) => !Number.isNaN(Number(item)))
      .filter((item) => languageLevels & (item as number));
  }

  return [];
};
