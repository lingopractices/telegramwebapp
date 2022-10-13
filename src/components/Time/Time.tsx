import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';

import styles from './Time.module.scss';

interface ITime {
  defaultMeetingTime?: string;
  onChangeTime: (time: string) => void;
}

const Time: React.FC<ITime> = ({ defaultMeetingTime, onChangeTime }) => {
  const [date, setDate] = useState<string | null>(
    dayjs(defaultMeetingTime).format(DAY_MONTH_YAER) || null,
  );
  const [time, setTime] = useState<Dayjs | null>(dayjs(defaultMeetingTime));
  const [times, setTimes] = useState<Dayjs[]>([]);

  useEffect(() => {
    if (time) {
      onChangeTime(String(time));
    }
  }, [time, onChangeTime]);

  useEffect(() => {
    if (date) {
      setTimes(getDates(dayjs(date, DAY_MONTH_YAER)));
    }
  }, [date, setTimes]);

  const handleChangeTime = useCallback(
    (id: number | string) => {
      setTime(dayjs.unix(Number(id)));
    },
    [setTime],
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

// temporary
const getDates = (date: Dayjs) => {
  const resultArr = [];
  const maxTime = dayjs(date.set('hour', 23).set('minutes', 30).set('second', 0));
  let minTime;

  if (date.isToday()) {
    minTime = date
      .set('second', 0)
      .set('minutes', date.minute() < 30 ? 30 : 0)
      .set('hours', date.minute() > 30 ? dayjs().hour() + 1 : dayjs().hour());
  } else {
    minTime = date.set('minutes', 0).set('second', 0).set('hours', 0);
  }

  while (minTime <= maxTime) {
    resultArr.push(minTime);
    minTime = minTime.set('minute', minTime.minute() + 30);
  }

  return resultArr;
};
