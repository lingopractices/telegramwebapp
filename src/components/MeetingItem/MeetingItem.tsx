import React from 'react';

import { ReactComponent as RightArrow } from '@assets/icons/right-arrow-icon.svg';
import { replaceInUrl } from '@utils/replace-in-url';
import { Link } from 'react-router-dom';
import { MEETING_PATH } from 'routing/routing.constants';

import styles from './MeetingItem.module.scss';

interface IMeetingItemProps {
  id: number;
  defaultText: string;
  date: string;
}

const MeetingItem: React.FC<IMeetingItemProps> = ({ id, defaultText, date }) => (
  <Link to={replaceInUrl(MEETING_PATH, ['id', id])} className={styles.container}>
    <div className={styles.info}>
      <span className={styles.defaultText}>{defaultText}</span>
      <div className={styles.date}>{date}</div>
    </div>
    <RightArrow />
  </Link>
);

export default MeetingItem;
