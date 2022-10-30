import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { getAvailableTimes } from '@utils/dateUtils';
import { HOUR_MINUTE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';

import styles from './Time.module.scss';

interface ITime {
  defaultMeetingTime?: Dayjs;
  onChangeTime: (time: Dayjs) => void;
}

const Time: React.FC<ITime> = ({ defaultMeetingTime, onChangeTime }) => {
  const [time, setTime] = useState(defaultMeetingTime);
  const [times, setTimes] = useState<Dayjs[]>([]);

  useEffect(() => {
    if (defaultMeetingTime) {
      setTimes(getAvailableTimes(defaultMeetingTime));
    }
  }, [defaultMeetingTime, setTimes]);

  const handleChangeTime = useCallback(
    (id: number | string) => {
      const currentTime = dayjs.unix(Number(id));
      setTime(currentTime);
      onChangeTime(currentTime);
    },
    [setTime, onChangeTime],
  );

  return (
    <div className={styles.container}>
      <h2>{'choose meeting time'.toUpperCase()}</h2>
      <div className={styles.wrapper}>
        {times.map((item) => (
          <RadioItem
            id={item.unix()}
            key={item.unix()}
            label={item.format(HOUR_MINUTE)}
            radioGroupName='time'
            isSelected={time?.unix() === item.unix()}
            onChange={handleChangeTime}
            containerClass={styles.itemContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default Time;
