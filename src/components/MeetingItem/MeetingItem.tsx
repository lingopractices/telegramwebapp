import React from 'react';

import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import { replaceInUrl } from '@utils/replace-in-url';
import { Link } from 'react-router-dom';

import styles from './MeetingItem.module.scss';

interface IMeetingItemProps {
  id: number;
  defaultText: string;
  date: string;
  mainRoute: string;
}

const MeetingItem: React.FC<IMeetingItemProps> = ({ id, defaultText, date, mainRoute }) => (
  <Link to={replaceInUrl(mainRoute, ['id', id])} className={styles.container}>
    <div className={styles.info}>
      <span className={styles.defaultText}>{defaultText}</span>
      <div className={styles.date}>{date}</div>
    </div>
    <RightArrow />
  </Link>
);

export default React.memo(MeetingItem);
