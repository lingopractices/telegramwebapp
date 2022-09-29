import React, { useCallback } from 'react';

import classNames from 'classnames';

import styles from './TimeItem.module.scss';

interface ITimeItemProps {
  label: string;
  isSelected: boolean;
  onClick: (label: string) => void;
}

const TimeItem: React.FC<ITimeItemProps> = ({ label, isSelected, onClick }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onClick(e.target.value);
    },
    [onClick],
  );

  return (
    <label className={classNames(styles.container, { [styles.selected]: isSelected })}>
      {label}
      <input type='radio' name='time' value={label} onChange={handleChange} />
    </label>
  );
};

export default React.memo(TimeItem);
