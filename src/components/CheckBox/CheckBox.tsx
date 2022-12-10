import React, { useCallback } from 'react';

import { ReactComponent as CheckBoxInner } from '@assets/icons/check-box-inner.svg';
import { ReactComponent as CheckBoxOuter } from '@assets/icons/check-box-outer.svg';
import classNames from 'classnames';

import styles from './CheckBox.module.scss';

interface ICheckBoxProps {
  id: number;
  title: string;
  checked: boolean;
  containerClass: string;
  onChange: (id: number) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = ({ id, title, checked, containerClass, onChange }) => {
  const handleChange = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  return (
    <label
      htmlFor={title}
      onClick={handleChange}
      className={classNames(styles.container, containerClass)}
    >
      <input id={`${id}`} type='checkbox' value={title} />
      <div className={styles.checkWrap}>
        <CheckBoxOuter className={styles.outer} />
        {checked && <CheckBoxInner className={styles.inner} />}
      </div>
      {title}
    </label>
  );
};

export default React.memo(CheckBox);
