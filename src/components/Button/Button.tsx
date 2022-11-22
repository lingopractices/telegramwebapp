import React from 'react';

import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
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
    disabled={disabled || loading}
    className={classNames(styles.container, containerClass)}
    onClick={onClick}
  >
    <span className={styles.title}>{title}</span>
    {loading && (
      <div className={styles.loader}>
        <AnimatedLogo size={LogoSize.SMALL} />
      </div>
    )}
  </button>
);

export default React.memo(Button);
