import React from 'react';

import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';

import MeetingItem from './MeetingItem/MeetingItem';

import styles from './Main.module.scss';

const Main = () => {
  const meetings = [
    { label: 'meeting', date: 'date' },
    { label: 'meeting2', date: 'date2' },
    { label: 'meeting3', date: 'date3' },
  ];

  return (
    <div className={styles.container}>
      <button type='button' className={styles.account}>
        account
      </button>
      <LingoLogo className={styles.logo} />
      <div className={styles.buttonWrapper}>
        <button type='button' className={styles.button}>
          create meeting
        </button>
        <button type='button' className={styles.button}>
          joing meeting
        </button>
      </div>
      {meetings.map((meeting) => (
        <MeetingItem key={meeting.label} date={meeting.date} />
      ))}
    </div>
  );
};

export default Main;
