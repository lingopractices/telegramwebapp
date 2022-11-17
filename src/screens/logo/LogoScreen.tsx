import React from 'react';

import AnimatedLogo from '@components/animatedLogo/AnimatedLogo';

import styles from './LogoScreen.module.scss';

const LogoScreen = () => (
  <div className={styles.container}>
    <AnimatedLogo />
  </div>
);

export default LogoScreen;
