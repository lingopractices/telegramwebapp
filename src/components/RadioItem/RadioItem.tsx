import React, { useCallback } from 'react';

import classNames from 'classnames';

import styles from './RadioItem.module.scss';

interface IRadioItemProps {
  id: number | string;
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  containerClass?: string;
  onChange: (id: number | string) => void;
}

const RadioItem: React.FC<IRadioItemProps> = ({
  id,
  radioGroupName,
  label,
  isSelected,
  containerClass,
  onChange,
}) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <label
      onClick={handleChange}
      htmlFor={label}
      className={classNames(styles.container, containerClass, {
        [`${styles.selected}`]: isSelected,
      })}
    >
      <input
        readOnly
        type='radio'
        name={radioGroupName}
        id={String(id)}
        value={label}
        checked={isSelected}
      />
      {label}
    </label>
  );
};

export default React.memo(RadioItem);
