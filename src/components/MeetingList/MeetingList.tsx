import React, { useCallback, useEffect, useState } from 'react';

import MeetingItem from '@components/MeetingItem/MeetingItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useNavigate } from 'react-router-dom';
import { JOIN_LEVELS_PATH } from 'routing/routing.constants';

import styles from './MeetingList.module.scss';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([
    { id: 0, label: 'meeting', date: 'date' },
    { id: 1, label: 'meeting2', date: 'date2' },
    { id: 2, label: 'meeting3', date: 'date3' },
  ]);

  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);
  useTgMainButton(false, false);

  const handleBack = useCallback(() => {
    navigate(JOIN_LEVELS_PATH);
  }, [navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <h2>{'meetings'.toUpperCase()}</h2>
      {meetings.map((meeting) => (
        <MeetingItem id={meeting.id} defaultText='Online Meeting' date={meeting.date} />
      ))}
    </div>
  );
};

export default MeetingList;
