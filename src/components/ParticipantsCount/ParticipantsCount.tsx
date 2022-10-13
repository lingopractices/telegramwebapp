import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';

interface IParticipiantsCount {
  defaultParticipiants?: number;
  onChangeParticipiants: (peopleNumber: number) => void;
}

const ParticipantsCount: React.FC<IParticipiantsCount> = ({
  defaultParticipiants,
  onChangeParticipiants,
}) => {
  const participiants = [2, 3, 5, 7, 9];

  const [currentCount, setCurrentCount] = useState(defaultParticipiants || participiants[1]);

  useEffect(() => {
    onChangeParticipiants(currentCount);
  }, [currentCount, onChangeParticipiants]);

  const handleChangeParticipantsCount = useCallback(
    (id: number | string) => {
      setCurrentCount(Number(id));
    },
    [setCurrentCount],
  );
  return (
    <div>
      <h3>Change level</h3>
      {participiants.map((count) => (
        <RadioItem
          id={count}
          key={count}
          radioGroupName='languages'
          label={count.toString()}
          onChange={handleChangeParticipantsCount}
          isSelected={count === currentCount}
        />
      ))}
    </div>
  );
};

export default ParticipantsCount;
