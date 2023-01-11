import React, { ReactNode } from 'react';

import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  title?: string;
  containerClass?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  title,
  containerClass = '',
  disabled,
  loading,
  onClick,
  children,
}) => (
  <button
    type='button'
    disabled={disabled || loading}
    className={classNames(styles.container, containerClass)}
    onClick={onClick}
  >
    <span className={classNames(styles.title, { [styles.loading]: loading })}>
      {title || children}
      {loading && (
        <div className={styles.loader}>
          <AnimatedLogo size={LogoSize.SMALL} />
        </div>
      )}
    </span>
  </button>
);

export default React.memo(Button);
