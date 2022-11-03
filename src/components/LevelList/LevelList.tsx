import React, { useCallback, useMemo } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { allLevels } from 'common/constants';
import { LanguageLevel } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';

import styles from './LevelList.module.scss';

interface ILevelList {
  defaultLevelId?: number;
  onChangeLevel: (languageLevel: LanguageLevel) => void;
}

const LevelList: React.FC<ILevelList> = ({ defaultLevelId, onChangeLevel }) => {
  const { t } = useTranslation();
  const levels = useMemo(() => [...allLevels], []);

  const handleChange = useCallback(
    (id: number | string) => {
      onChangeLevel(Number(id));
    },
    [onChangeLevel],
  );

  return (
    <div className={styles.container}>
      <h2>{t('level.chooseLevel').toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {levels.map((level) => (
          <RadioItem
            id={level.id}
            key={level.id}
            radioGroupName='languages'
            label={t(`levels.${level.id}`)}
            onChange={handleChange}
            isSelected={level.id === defaultLevelId}
            containerClass={styles.paddingContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
