import React, { useCallback, useEffect, useRef, useState } from 'react';

import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import StepBox from '@components/StepBox/StepBox';
import { TooltipType } from '@components/Tooltip/Tooltip';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getMeetingsAction } from '@store/meetings/actions';
import {
  getMeetingHasMoreSelector,
  getMeetingsPendingSelector,
  getMeetingsSelector,
} from '@store/meetings/selectors';
import { getMaxTimeOfDay } from '@utils/date-utils';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_MEETING_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './JoinMeetingList.module.scss';

const JoinMeetingList: React.FC = () => {
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
    if (
      meetingData?.date?.from &&
      meetingData?.language?.languageId &&
      meetingData?.level?.languageLevel
    ) {
      getMeetings({
        languageId: meetingData.language.languageId,
        languageLevel: meetingData.level.languageLevel,
        from: meetingData.date.from,
        to: getMaxTimeOfDay(meetingData.date.from),
      }).catch(() =>
        setNotification({
          id: dayjs().unix(),
          type: TooltipType.ERROR,
          text: t('errors.meetings'),
        }),
      );
    }
  }, [
    meetingData?.date?.from,
    meetingData?.language?.languageId,
    meetingData?.level?.languageLevel,
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
    <div className={styles.container} ref={meetingsRef}>
      <StepBox meetingData={meetingData} containerClass={styles.stepBoxContainer} />
      <h2>{t('meetings.meetings')}</h2>
      <InfiniteScroll hasMore={hasMore} containerRef={meetingsRef} onReachBottom={loadMore}>
        {meetings.map((meeting) => (
          <MeetingItem
            id={meeting.id}
            key={meeting.id}
            date={meeting.meetingDate}
            mainRoute={JOIN_MEETING_PATH}
            defaultText={t('meetings.meetingTitles.online')}
            meetingData={meetingData}
          />
        ))}
        {pendingMeetings && (
          <AnimatedLogo containerClass={styles.containerLoader} size={LogoSize.SMALL} />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default JoinMeetingList;
