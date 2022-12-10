import React, { useCallback, useMemo } from 'react';

import CheckBox from '@components/CheckBox/CheckBox';
import RadioItem from '@components/RadioItem/RadioItem';
import { allLevels } from 'common/constants';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';

import styles from './LevelList.module.scss';

interface ILevelList {
  defaultLevelId: LanguageLevel;
  multiple: boolean;
  title?: string;
  onChangeLevel: (languageLevel: LanguageLevel) => void;
}

const LevelList: React.FC<ILevelList> = ({ defaultLevelId, multiple, title, onChangeLevel }) => {
  const { t } = useTranslation();
  const levels = useMemo(() => [...allLevels], []);

  const handleChange = useCallback(
    (id: number | string) => {
      if (typeof id === 'number') {
        if (multiple) {
          let newLevels: LanguageLevel = defaultLevelId;
          /* eslint no-bitwise: ["error", { "allow": ["&","&=","~", "|="] }] */
          if (newLevels & id) {
            newLevels &= ~id;
          } else {
            newLevels |= id;
          }
          onChangeLevel(newLevels);
        } else {
          onChangeLevel(id);
        }
      }
    },
    [defaultLevelId, multiple, onChangeLevel],
  );

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {multiple
        ? levels.map((level) => (
            <CheckBox
              id={level.id}
              key={level.id}
              title={t(`levels.${level.id}`)}
              checked={!!(defaultLevelId & level.id)}
              onChange={handleChange}
              containerClass={styles.mluti}
            />
          ))
        : levels.map((level) => (
            <RadioItem
              id={level.id}
              key={level.id}
              radioGroupName='levels'
              label={t(`levels.${level.id}`)}
              onChange={handleChange}
              containerClass={styles.item}
              isSelected={level.id === defaultLevelId}
            />
          ))}
    </div>
  );
};

export default LevelList;
