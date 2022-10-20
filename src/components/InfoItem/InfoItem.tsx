import React from 'react';

import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';

import styles from './InfoItem.module.scss';

interface IInfoItemProps {
  title: string;
  value?: string;
  onClick: () => void;
}

const InfoItem: React.FC<IInfoItemProps> = ({ title, value, onClick }) => (
  <div className={styles.container}>
    <span className={styles.title}>{title}</span>
    <div className={styles.bottomWrapper} onClick={onClick}>
      <span className={styles.value}>{value}</span>
      <EditIcon />
    </div>
  </div>
);

export default InfoItem;
