import React, { useEffect, useState } from 'react';

import TimeItem from '@components/DateAndTime/ChangeTime/TimeItem/TimeItem';

import styles from './ChangeTime.module.scss';

interface IChangeTimeProps {
  selectedTime: string;
  onChange: (time: string) => void;
}

const ChangeTime: React.FC<IChangeTimeProps> = ({ selectedTime, onChange }) => {
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
      {times.map((item) => (
        <TimeItem key={item} label={item} isSelected={selectedTime === item} onClick={onChange} />
      ))}
    </div>
  );
};

export default ChangeTime;
