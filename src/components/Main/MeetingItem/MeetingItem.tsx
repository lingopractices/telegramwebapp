import React from 'react';

import { Link } from 'react-router-dom';
import { MEETING_PATH } from 'routing/routing.constants';

import styles from './MeetingItem.module.scss';

interface IMeetingItemProps {
  date: string;
}

const MeetingItem: React.FC<IMeetingItemProps> = ({ date }) => (
  <Link to={MEETING_PATH} className={styles.container}>
    <div className={styles.defaultText}>meeting</div>
    <div className={styles.date}>{date}</div>
  </Link>
);

export default MeetingItem;
