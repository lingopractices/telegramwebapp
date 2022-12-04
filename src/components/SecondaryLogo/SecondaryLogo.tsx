import React from 'react';

import classNames from 'classnames';

import styles from './SecondaryLogo.module.scss';

interface ISecondaryLogoProps {
  containerClass?: string;
}

const SecondaryLogo: React.FC<ISecondaryLogoProps> = ({ containerClass }) => (
  <div className={classNames(styles.container, containerClass)}>
    <p>LINGO PRACTICES</p>
    <div className={styles.lineWrapepr}>
      <div className={styles.dark} />
      <div className={styles.blueDark} />
      <div className={styles.yellow} />
      <div className={styles.blueLight} />
    </div>
  </div>
);

export default SecondaryLogo;
