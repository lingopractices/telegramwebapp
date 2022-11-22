import React from 'react';

import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';

import styles from './LogoScreen.module.scss';

const LogoScreen = () => (
  <div className={styles.container}>
    <AnimatedLogo size={LogoSize.FULL} />
  </div>
);

export default LogoScreen;
