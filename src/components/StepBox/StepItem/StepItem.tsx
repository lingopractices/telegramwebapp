import React from 'react';

import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { Link } from 'react-router-dom';
import { CreateMeetingType, JoinMeetingType } from 'screens/types';

import styles from './StepItem.module.scss';

interface IStepItem {
  path: string;
  title: string;
  value?: string;
  data?: CreateMeetingType | JoinMeetingType;
}
const StepItem: React.FC<IStepItem> = ({ path, title, value, data }) => (
  <Link className={styles.container} to={path} state={{ ...data }}>
    <div>
      <span className={styles.title}>{title}:</span> <span className={styles.value}>{value}</span>
    </div>
    <EditIcon />
  </Link>
);

export default React.memo(StepItem);
