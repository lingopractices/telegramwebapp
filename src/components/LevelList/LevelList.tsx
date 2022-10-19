import React, { useCallback, useEffect, useMemo, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { allLevels } from 'common/constants';
import { LanguageLevel } from 'lingopractices-models';

import styles from './LevelList.module.scss';

interface ILevelList {
  dafaultLevelId?: number;
  onChangeLevel: (languageLevel: LanguageLevel) => void;
}

const LevelList: React.FC<ILevelList> = ({ dafaultLevelId, onChangeLevel }) => {
  const levels = useMemo(() => [...allLevels], []);
  const [currentLevelId, setCurrentLevelId] = useState(dafaultLevelId);

  useEffect(() => {
    if (currentLevelId) {
      onChangeLevel(currentLevelId);
    }
  }, [currentLevelId, onChangeLevel]);

  const handleChange = useCallback(
    (id: number | string) => {
      setCurrentLevelId(Number(id));
    },
    [setCurrentLevelId],
  );

  return (
    <div className={styles.container}>
      <h2>{'choose meeting language level'.toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {levels.map((level) => (
          <RadioItem
            id={level.id}
            key={level.id}
            radioGroupName='languages'
            label={level.name}
            onChange={handleChange}
            isSelected={level.id === currentLevelId}
            containerClass={styles.paddingContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
