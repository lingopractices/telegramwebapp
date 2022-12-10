import React from 'react';

import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import classNames from 'classnames';

import styles from './SelectNextScreen.module.scss';

interface ISelectNextScreen {
  title: string;
  containerClass?: string;
  onClick: () => void;
}

const SelectNextScreen: React.FC<ISelectNextScreen> = ({ title, containerClass, onClick }) => (
  <button className={classNames(styles.container, containerClass)} onClick={onClick}>
    <span>{title}</span>
    <RightArrow />
  </button>
);

export default React.memo(SelectNextScreen);
