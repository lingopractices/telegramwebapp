import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_TOPICS_PATH } from 'routing/routing.constants';

const ParticipantsCount = () => {
  const participiants = ['2', '3', '5', '7', '9'];

  const [currentCount, setCurrentCount] = useState(participiants[1]);
  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A NUMBER',
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_TOPICS_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_DATE_PATH);
  }, [navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    if (currentCount) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ is_active: false });
    }
  }, [currentCount, setMainButtonParams]);

  const handleChangeParticipantsCount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentCount(event.target.value);
    },
    [setCurrentCount],
  );
  return (
    <div>
      <h3>Change level</h3>
      {participiants.map((count) => (
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
