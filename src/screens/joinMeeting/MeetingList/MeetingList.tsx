import React, { useCallback, useEffect, useRef, useState } from 'react';

import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import { TooltipType } from '@components/Tooltip/Tooltip';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getMeetingsAction } from '@store/meetings/actions';
import {
  getMeetingHasMoreSelector,
  getMeetingsPendingSelector,
  getMeetingsSelector,
} from '@store/meetings/selectors';
import { setNotificationAction } from '@store/notifications/actions';
import { getMaxTimeOfDay } from '@utils/date-utils';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_MEETING_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './MeetingList.module.scss';

const MeetingList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<JoinMeetingType>(location?.state?.meetingData);
  const meetings = useSelector(getMeetingsSelector);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const hasMore = useSelector(getMeetingHasMoreSelector);
  const pendingMeetings = useSelector(getMeetingsPendingSelector);
  const getMeetings = useActionWithDeferred(getMeetingsAction);
  const { t } = useTranslation();
  const setNotification = useActionWithDispatch(setNotificationAction);

  const { setBackButtonOnClick } = useTgBackButton(true);

  const loadMore = useCallback(() => {
    if (meetingData?.from && meetingData?.languageId && meetingData?.languageLevel) {
      getMeetings({
        languageId: meetingData.languageId,
        languageLevel: meetingData.languageLevel,
        from: meetingData.from,
        to: getMaxTimeOfDay(meetingData.from),
      }).catch(() =>
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.meetings'),
        }),
      );
    }
  }, [
    meetingData?.from,
    meetingData?.languageId,
    meetingData?.languageLevel,
    getMeetings,
    setNotification,
    t,
  ]);

  const handleBack = useCallback(() => {
    navigate(JOIN_DATE_PATH, { state: { meetingData } });
  }, [meetingData, navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <h2>{t('meetings.meetings')}</h2>
      <div className={styles.meetingsWrapper} ref={meetingsRef}>
        <InfiniteScroll onReachBottom={loadMore} containerRef={meetingsRef} hasMore={hasMore}>
          {meetings.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              id={meeting.id}
              defaultText='Online Meeting'
              date={meeting.meetingDate}
              meetingData={meetingData}
              mainRoute={JOIN_MEETING_PATH}
            />
          ))}
          {pendingMeetings && <AnimatedLogo size={LogoSize.SMALL} />}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MeetingList;
