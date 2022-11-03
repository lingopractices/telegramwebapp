import React, { useCallback, useEffect, useState } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import { getAvailableTimes } from '@utils/dateUtils';
import { HOUR_MINUTE } from 'common/constants';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

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
    (id: number | string) => {
      onChangeTime(dayjs.unix(Number(id)));
    },
    [onChangeTime],
  );

  return (
    <div className={styles.container}>
      <h2>{t('time.chooseTime').toUpperCase()}</h2>
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
