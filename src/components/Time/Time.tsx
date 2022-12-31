import React, { useCallback, useEffect, useState } from 'react';

import { getAvailableTimes } from '@utils/date-utils';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

import TimeItem from './TimeItem/TimeItem';

import styles from './Time.module.scss';

interface ITime {
  defaultTime?: Dayjs;
  defaultDate?: Dayjs | null;
  onChangeTime: (time: Dayjs) => void;
}

const Time: React.FC<ITime> = ({ defaultTime, defaultDate, onChangeTime }) => {
  const [times, setTimes] = useState<Dayjs[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultDate) {
      setTimes(getAvailableTimes(dayjs(defaultDate)));
    }
  }, [defaultDate, setTimes]);

  const handleChangeTime = useCallback(
    (id: number) => {
      onChangeTime(dayjs.unix(id));
    },
    [onChangeTime],
  );

  return (
    <div className={styles.container}>
      <h2>{t('time.chooseTime')}</h2>
      <div className={styles.wrapper}>
        {times.map((item) => (
          <TimeItem
            key={String(item.unix())}
            id={item.unix()}
            time={item}
            selected={dayjs(defaultTime).unix() === item.unix()}
            onChangeTime={handleChangeTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Time;
