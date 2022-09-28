import React from 'react';

import styles from './styles.module.scss';

interface IRadioItemProps {
  radioGroupName: string;
  label: string;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioItem: React.FC<IRadioItemProps> = ({ radioGroupName, label, isSelected, onChange }) => (
  <label htmlFor={label} className={styles.container}>
    <input onChange={onChange} type='radio' name={radioGroupName} id={label} value={label} checked={isSelected} />
    {label}
  </label>
);

export default React.memo(RadioItem);
