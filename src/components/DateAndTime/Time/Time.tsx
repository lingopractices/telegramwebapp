import React, { useEffect, useState } from 'react';

import TimeItem from '@components/DateAndTime/Time/TimeItem/TimeItem';

import styles from './Time.module.scss';

interface ITimeProps {
  selectedTime: string;
  onChange: (time: string) => void;
}

const Time: React.FC<ITimeProps> = ({ selectedTime, onChange }) => {
  const [times, setTimes] = useState<string[]>([]);

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
          <TimeItem key={item} label={item} isSelected={selectedTime === item} onClick={onChange} />
        ))}
      </div>
    </div>
  );
};

export default Time;
