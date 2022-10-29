import React, { useCallback, useMemo } from 'react';

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

  const handleChange = useCallback(
    (id: number | string) => {
      onChangeLevel(Number(id));
    },
    [onChangeLevel],
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
            isSelected={level.id === dafaultLevelId}
            containerClass={styles.paddingContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelList;
