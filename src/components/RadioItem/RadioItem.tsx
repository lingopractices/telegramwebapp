import React from 'react';


import { ReactComponent as EmptyEllipse } from '@assets/icons/radio-ellipse.svg';
import { ReactComponent as FillEllipse } from '@assets/icons/radio-filled-ellipse.svg';

import styles from './RadioItem.module.scss';

interface IRadioItemProps {
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioItem: React.FC<IRadioItemProps> = ({ radioGroupName, label, isSelected, onChange }) => (
  <label htmlFor={label} className={styles.container}>
    <input onChange={onChange} type='radio' name={radioGroupName} id={label} value={label} checked={isSelected} />
    <div className={styles.radioWrapper}>
      <EmptyEllipse />
      {isSelected && <FillEllipse className={styles.radioFill} />}
    </div>
    {label}
  </label>
);

export default React.memo(RadioItem);
