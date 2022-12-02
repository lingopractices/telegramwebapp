import React, { useCallback } from 'react';

import { ReactComponent as CheckBoxInner } from '@assets/icons/check-box-inner.svg';
import classNames from 'classnames';

import styles from './CheckedRadio.module.scss';

interface ICheckedRadioProps {
  id: string;
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  containerClass?: string;
  onChange: (name: string) => void;
}

const CheckedRadio: React.FC<ICheckedRadioProps> = ({
  id,
  radioGroupName,
  label,
  isSelected,
  containerClass,
  onChange,
}) => {
  const handleChange = useCallback(() => {
    onChange(label);
  }, [label, onChange]);

  return (
    <label
      onClick={handleChange}
      htmlFor={label}
      className={classNames(styles.container, containerClass)}
    >
      <input
        readOnly
        type='radio'
        name={radioGroupName}
        id={id}
        value={label}
        checked={isSelected}
      />
      {label}
      {isSelected && <CheckBoxInner />}
    </label>
  );
};

export default React.memo(CheckedRadio);
