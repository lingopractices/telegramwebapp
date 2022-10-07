import React, { useCallback, useEffect, useState } from 'react';

import TimeItem from '@components/Time/TimeItem/TimeItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { CREATE_INFO } from 'routing/routing.constants';

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
    navigate(-1);
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
      setMainButtonParams({ text: 'CHOOSE A TIME', is_active: false });
    }
  }, [time, setMainButtonParams]);

  const handleChangeTime = useCallback((label: string) => {
    setTime(label);
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
          <TimeItem key={item} label={item} isSelected={time === item} onClick={handleChangeTime} />
        ))}
      </div>
    </div>
  );
};

export default Time;
