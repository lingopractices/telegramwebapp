import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { LanguageLevel } from 'lingopractices-models';

import styles from './LevelList.module.scss';

interface ILevelList {
  dafaultLevelId?: LanguageLevel;
  onChangeLevel: (languageLevel: LanguageLevel) => void;
}

const LevelList: React.FC<ILevelList> = ({ dafaultLevelId, onChangeLevel }) => {
  const levels = [
    { name: 'Beginer', id: LanguageLevel.Beginner },
    { name: 'Pre-intemediate', id: LanguageLevel.PreIntermediate },
    { name: 'Intermediate', id: LanguageLevel.Intermediate },
  ];
  const [currentLevelId, setCurrentLevelId] = useState(dafaultLevelId || levels[1].id);

  useEffect(() => {
    onChangeLevel(currentLevelId);
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
