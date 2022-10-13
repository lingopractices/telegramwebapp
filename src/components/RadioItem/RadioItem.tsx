import React from 'react';

import classNames from 'classnames';

import styles from './RadioItem.module.scss';

interface IRadioItemProps {
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  containerClass?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioItem: React.FC<IRadioItemProps> = ({
  radioGroupName,
  label,
  isSelected,
  containerClass,
  onChange,
}) => (
  <label
    htmlFor={label}
    className={classNames(styles.container, containerClass, {
      [`${styles.selected}`]: isSelected,
    })}
  >
    <input
      onChange={onChange}
      type='radio'
      name={radioGroupName}
      id={label}
      value={label}
      checked={isSelected}
    />
    {label}
  </label>
);

export default React.memo(RadioItem);
