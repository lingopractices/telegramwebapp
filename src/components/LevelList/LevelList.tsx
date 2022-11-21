import React, { useCallback, useMemo } from 'react';

import CheckBox from '@components/CheckBox/CheckBox';
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
      <h2>{t('level.chooseLevel')}</h2>
      <div className={styles.wrapper}>
        {levels.map((level) => (
          <CheckBox
            id={level.id}
            key={level.id}
            title={t(`levels.${level.id}`)}
            onChange={handleChange}
            checked={level.id === defaultLevelId}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
