import React, { useCallback, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';

import styles from './LevelList.module.scss';

const LevelList = () => {
  const levels = ['Beginer', 'Pre-intemediate', 'Intermediate'];
  const [currentLevel, setCurrentLevel] = useState(levels[1]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLevel(event.target.value);
    },
    [setCurrentLevel],
  );
  return (
    <div className={styles.container}>
      <h2>{'choose meeting language level'.toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {levels.map((level) => (
          <RadioItem
            key={level}
            radioGroupName='languages'
            label={level}
            onChange={handleChange}
            isSelected={level === currentLevel}
            paddingClass={styles.paddingContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
