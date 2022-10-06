import React from 'react';

import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';
import { Link } from 'react-router-dom';
import {
  ACCOUNT_PATH,
  CREATE_LANGUAGES_PATH,
  JOIN_LANGUAGES_PATH,
} from 'routing/routing.constants';

import MeetingItem from '../MeetingItem/MeetingItem';

import styles from './Main.module.scss';

const Main = () => {
  const meetings = [
    { id: 0, label: 'meeting', date: 'date' },
    { id: 1, label: 'meeting2', date: 'date2' },
    { id: 2, label: 'meeting3', date: 'date3' },
  ];

  return (
    <div className={styles.container}>
      <Link to={ACCOUNT_PATH} className={styles.account}>
        account
      </Link>
      <LingoLogo className={styles.logo} />
      <div className={styles.buttonWrapper}>
        <Link to={CREATE_LANGUAGES_PATH} className={styles.button}>
          create meeting
        </Link>
        <Link to={JOIN_LANGUAGES_PATH} className={styles.button}>
          joing meeting
        </Link>
      </div>
      {meetings.map((meeting) => (
        <MeetingItem
          key={meeting.label}
          date={meeting.date}
          defaultText='Online Meeting'
          id={meeting.id}
        />
      ))}
    </div>
  );
};

export default Main;
