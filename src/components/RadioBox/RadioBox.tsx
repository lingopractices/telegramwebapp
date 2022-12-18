import React, { useCallback } from 'react';

import { ReactComponent as RadioBoxInner } from '@assets/icons/radio-box-inner.svg';
import { ReactComponent as RadioBoxOuter } from '@assets/icons/radio-box-outer.svg';
import classNames from 'classnames';

import styles from './RadioBox.module.scss';

interface IRadioBoxProps {
  id: number | string;
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  containerClass?: string;
  onChange: (id: number | string) => void;
}

const RadioBox: React.FC<IRadioBoxProps> = ({
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
      htmlFor={label}
      onClick={handleChange}
      className={classNames(styles.container, containerClass)}
    >
      <input id={`${id}`} type='radio' value={label} radioGroup={radioGroupName} />
      <div className={styles.radioWrap}>
        <RadioBoxOuter className={classNames(styles.outer, { [styles.selected]: isSelected })} />
        {isSelected && <RadioBoxInner className={styles.inner} />}
      </div>
      {label}
    </label>
  );
};

export default React.memo(RadioBox);
