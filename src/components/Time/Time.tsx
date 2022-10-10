import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { CREATE_DATE_PATH, CREATE_INFO } from 'routing/routing.constants';

import styles from './Time.module.scss';

const Time = () => {
  const [times, setTimes] = useState<string[]>([]);
  const [time, setTime] = useState<string>('');

  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  const { setMainButtonOnClick, setMainButtonParams } = useTgMainButton(
    true,
    false,
    'CHOOSE A DATE',
  );

  const handleBack = useCallback(() => {
    navigate(CREATE_DATE_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(CREATE_INFO);
  }, [navigate]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    if (time) {
      setMainButtonParams({ text: 'SUBMIT', is_active: true });
    } else {
      setMainButtonParams({ is_active: false });
    }
  }, [time, setMainButtonParams]);

  const handleChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  }, []);

  useEffect(() => {
    const timess: string[] = [];

    for (let index = 0; index < 50; index += 1) {
      if (index < 10) {
        timess[index] = `0${index}:0${index}`;
      } else {
        timess[index] = `${index}:${index}`;
      }
    }

    setTimes(timess);
  }, []);

  return (
    <div className={styles.container}>
      <h2>{'choose meeting time'.toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {times.map((item) => (
          <RadioItem
            key={item}
            label={item}
            radioGroupName='time'
            isSelected={time === item}
            onChange={handleChangeTime}
            containerClass={styles.itemContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default Time;
