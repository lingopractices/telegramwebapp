import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  title: string;
  containerClass?: string;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ title, containerClass = '', onClick }) => (
  <button type='button' className={classNames(styles.container, containerClass)} onClick={onClick}>
    {title}
  </button>
);

export default React.memo(Button);
