import React, { useState } from 'react';

import MeetingItem from '@components/MeetingItem/MeetingItem';

import styles from './MeetingList.module.scss';

interface IMeetingList {
  mainRoute: string;
}

const MeetingList: React.FC<IMeetingList> = ({ mainRoute }) => {
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
          mainRoute={mainRoute}
        />
      ))}
    </div>
  );
};

export default MeetingList;
