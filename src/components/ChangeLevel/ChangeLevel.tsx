import React, { useCallback, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';

const ChangeLevel = () => {
  const levels = ['Beginer', 'Pre-intemediate', 'Intermediate'];
  const [currentLevel, setCurrentLevel] = useState(levels[1]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentLevel(event.target.value);
    },
    [setCurrentLevel],
  );
  return (
    <div>
      <h3>Change level</h3>
      {levels.map((level) => (
        <RadioItem key={level} radioGroupName='languages' label={level} onChange={handleChange} isSelected={level === currentLevel} />
      ))}
    </div>
  );
};

export default ChangeLevel;
