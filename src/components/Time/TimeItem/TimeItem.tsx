import React, { useCallback } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import classNames from 'classnames';
import { HOUR_MINUTE } from 'common/constants';
import { Dayjs } from 'dayjs';

import styles from './TimeItem.module.scss';

interface ITimeItemProps {
  id: number;
  time: Dayjs;
  selected: boolean;
  containerClass?: string;
  onChangeTime: (id: number) => void;
}

const TimeItem: React.FC<ITimeItemProps> = ({
  id,
  time,
  selected,
  containerClass,
  onChangeTime,
}) => {
  const handleChangeTime = useCallback(() => {
    onChangeTime(id);
  }, [id, onChangeTime]);

  return (
    <div className={classNames(styles.container, containerClass)}>
      <RadioItem
        id={id}
        radioGroupName='participants'
        label={time.format(HOUR_MINUTE)}
        onChange={handleChangeTime}
        isSelected={selected}
      />
    </div>
  );
};

export default React.memo(TimeItem);
