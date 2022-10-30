import React from 'react';

import { ReactComponent as RightArrow } from '@assets/icons/right-arrow.svg';
import { replaceInUrl } from '@utils/replace-in-url';
import { DAY_MONTH_YAER, HOUR_MINUTE } from 'common/constants';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { JoinMeetingType } from 'screens/types';

import styles from './MeetingItem.module.scss';

interface IMeetingItemProps {
  id: number;
  defaultText: string;
  date: string;
  mainRoute: string;
  meetingData?: JoinMeetingType;
}

const MeetingItem: React.FC<IMeetingItemProps> = ({
  id,
  defaultText,
  date,
  mainRoute,
  meetingData,
}) => (
  <Link
    to={replaceInUrl(mainRoute, ['id', id])}
    state={{ meetingData }}
    className={styles.container}
  >
    <div className={styles.info}>
      <span className={styles.defaultText}>{defaultText}</span>
      <div className={styles.date}>
        {`${dayjs(date).format(DAY_MONTH_YAER)} at ${dayjs(date).format(HOUR_MINUTE)}`}
      </div>
    </div>
    <RightArrow />
  </Link>
);
export default React.memo(MeetingItem);
