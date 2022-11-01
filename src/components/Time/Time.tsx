import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { getAvailableTimesTest } from '@utils/dateUtils';
import { HOUR_MINUTE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';

import styles from './Time.module.scss';

interface ITime {
  defaultTime?: Dayjs;
  defaultDate?: Dayjs | null;
  onChangeTime: (time: Dayjs) => void;
}

const Time: React.FC<ITime> = ({ defaultTime, defaultDate, onChangeTime }) => {
  const [times, setTimes] = useState<Dayjs[]>([]);

  useEffect(() => {
    if (defaultDate) {
      setTimes(getAvailableTimesTest(dayjs(defaultDate)));
    }
  }, [defaultDate, setTimes]);

  const handleChangeTime = useCallback(
    (id: number | string) => {
      onChangeTime(dayjs.unix(Number(id)));
    },
    [onChangeTime],
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
            isSelected={dayjs(defaultTime).unix() === item.unix()}
            onChange={handleChangeTime}
            containerClass={styles.itemContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default Time;
