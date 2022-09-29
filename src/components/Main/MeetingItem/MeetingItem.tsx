import React from 'react';

import styles from './MeetingItem.module.scss';

interface IMeetingItemProps {
  date: string;
}

const MeetingItem: React.FC<IMeetingItemProps> = ({ date }) => (
  <button type='button' className={styles.container}>
    <div className={styles.defaultText}>meeting</div>
    <div className={styles.date}>{date}</div>
  </button>
);

export default MeetingItem;
