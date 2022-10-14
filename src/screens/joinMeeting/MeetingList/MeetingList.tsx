import React, { useCallback, useEffect, useState } from 'react';

import MeetingItem from '@components/MeetingItem/MeetingItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_MEETING_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './MeetingList.module.scss';

const MeetingList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);

  const { setBackButtonOnClick } = useTgBackButton(true);
  useTgMainButton(false, false);

  const handleBack = useCallback(() => {
    navigate(JOIN_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  const [meetings, setMeetings] = useState([
    { id: 0, label: 'meeting', date: 'date' },
    { id: 1, label: 'meeting2', date: 'date2' },
    { id: 2, label: 'meeting3', date: 'date3' },
  ]);

  return (
    <div className={styles.container}>
      <h2>{'meetings'.toUpperCase()}</h2>
      {meetings.map((meeting) => (
        <MeetingItem
          key={meeting.id}
          id={meeting.id}
          defaultText='Online Meeting'
          date={meeting.date}
          meetingData={meetingData}
          mainRoute={JOIN_MEETING_PATH}
        />
      ))}
    </div>
  );
};

export default MeetingList;
