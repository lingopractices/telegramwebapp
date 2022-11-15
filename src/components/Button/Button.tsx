import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  title: string;
  containerClass?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({
  title,
  containerClass = '',
  disabled,
  loading,
  onClick,
}) => (
  <button
    type='button'
    disabled={disabled}
    className={classNames(styles.container, containerClass)}
    onClick={onClick}
  >
    {title}
  </button>
);

export default React.memo(Button);
