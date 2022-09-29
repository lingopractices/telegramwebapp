import React, { useCallback, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';

const ParticipantsCount = () => {
  const levels = ['2', '3', '5', '7', '9'];
  const [currentCount, setCurrentCount] = useState(levels[1]);

  const handleChangeParticipantsCount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentCount(event.target.value);
    },
    [setCurrentCount],
  );
  return (
    <div>
      <h3>Change level</h3>
      {levels.map((count) => (
        <RadioItem
          key={count}
          radioGroupName='languages'
          label={count}
          onChange={handleChangeParticipantsCount}
          isSelected={count === currentCount}
        />
      ))}
    </div>
  );
};

export default ParticipantsCount;
