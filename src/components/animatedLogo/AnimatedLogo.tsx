import React from 'react';

import { ReactComponent as LingoInner } from '@assets/logo-inner.svg';
import { ReactComponent as LingoOuter } from '@assets/logo-outer.svg';
import classNames from 'classnames';

import styles from './AnimatedLogo.module.scss';

export const enum LogoSize {
  SMALL,
  FULL,
}

interface IAnimatedLogoProps {
  size: LogoSize;
  containerClass?: string;
}

const AnimatedLogo: React.FC<IAnimatedLogoProps> = ({ size, containerClass }) => (
  <div
    className={classNames(styles.wrapper, containerClass, {
      [`${styles.small}`]: size === LogoSize.SMALL,
    })}
  >
    <LingoOuter className={styles.outer} />
    <LingoInner className={styles.inner} />
  </div>
);

export default AnimatedLogo;
