import React from 'react';

import { ReactComponent as LeftIcon } from '@assets/icons/left-arrow.svg';
import Button from '@components/Button/Button';
import { MainButton } from 'telegram/types';

import styles from './StaticNavigation.module.scss';

interface IStaticNavigation {
  handleSubmit?: () => void;
  handleBack: () => void;
  devButton?: MainButton;
}

const StaticNavigation: React.FC<IStaticNavigation> = ({ handleBack, handleSubmit, devButton }) => (
  <>
    <div onClick={handleBack} className={styles.svgWrap}>
      <LeftIcon />
    </div>
    {devButton && handleSubmit && (
      <div className={styles.submit}>
        <Button
          title={devButton.text}
          disabled={!devButton?.isActive}
          loading={devButton?.isProgressVisible}
          onClick={handleSubmit}
        />
      </div>
    )}
  </>
);

export default StaticNavigation;
