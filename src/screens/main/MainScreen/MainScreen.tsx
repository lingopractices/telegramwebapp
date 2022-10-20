import React, { useCallback, useMemo } from 'react';

import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import { getMyMeetingsSelector } from '@store/meetings/selectors';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { IMeeting } from 'lingopractices-models';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ACCOUNT_PATH,
  CREATE_LANGUAGES_PATH,
  JOIN_LANGUAGES_PATH,
  MEETING_PATH,
} from 'routing/routing.constants';

import styles from './MainScreen.module.scss';

const MainScreen: React.FC = () => {
  const myMeetings = useSelector(getMyMeetingsSelector);

  useTgBackButton(false);
  useTgMainButton(false, false);

  const renderMeetings = useCallback(
    (meeting: IMeeting) => (
      <MeetingItem
        id={meeting.id}
        key={meeting.id}
        date={`${dayjs(meeting.meetingDate).format(DAY_MONTH_YAER)} at ${dayjs(
          meeting.meetingDate,
        ).format(HOUR_MINUTE)}`}
        mainRoute={MEETING_PATH}
        defaultText='Meeting'
      />
    ),
    [],
  );

  const renderedMeetings = useMemo(
    () => myMeetings.map(renderMeetings),
    [myMeetings, renderMeetings],
  );

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
      {myMeetings.length ? renderedMeetings : <div>{`there're no meetings yet`}</div>}
    </div>
  );
};

export default MainScreen;
